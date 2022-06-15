# for working with rdf in python
from rdflib import Graph , Literal , BNode , Namespace , RDF , RDFS , OWL , XSD, URIRef
# progress bars
from tqdm.autonotebook import tqdm
from colorama import Fore, Back, Style

class LBD():
    def __init__(self, workbook):
        self.workbook = workbook
    
    def injector(self):
        # ####################################################
        # 0. initiate the graph
        # 
        # ####################################################
        g = Graph()
        print(Fore.RED + "⚡ Initiated the graph object...")

        # ####################################################
        # 1. Add namespaces 
        # 
        # ####################################################

        g.bind( "rdf", RDF )

        g.bind( "owl" , OWL )

        g.bind( "xsd", XSD )

        # SSN ontology
        SSN = Namespace( "http://www.w3.org/ns/ssn/" )
        g.bind( "ssn", SSN)

        # SOSA ontology
        SOSA = Namespace( "http://www.w3.org/ns/sosa/" )
        g.bind( "sosa", SOSA )

        # BRICK ontology
        BRICK = Namespace( "https://brickschema.org/schema/Brick#")
        g.bind( "brick", BRICK)

        # SAREF4BLDG ontology
        SAREF4BLDG = Namespace( "https://saref.etsi.org/saref4bldg/" )
        g.bind( "saref4bldg", SAREF4BLDG)

        # FAULT DETECTION GRAPH NAMESPACE(example.com) - OURS
        FDG = Namespace( "https://example.com/fault-detection-graph#" )
        g.bind( "fdg" , FDG )

        print(Fore.RED + "⚡ Bound the required ontology namespaces...")



        # ####################################################
        # 2. We now navigate to the Facility sheet of the
        # workbook to extract our first entities: the site and 
        # building and map it to bot:Site and bot:Building 
        # from the bot ontology.
        #
        # ####################################################
        print(Fore.GREEN + "🚀 Injecting semantics into the " + Fore.YELLOW + "FACILITY" + Fore.GREEN + " sheet")
        # Navigate to building 'Facility' sheet
        sh_facility = self.workbook.sheet_by_name( "Facility" )

        # Add site
        siteID = str( sh_facility.cell_value( 1 , 15 ) )
        s = FDG[ siteID ]
        p = RDF.type
        o = BRICK[ "Site" ]
        g.add( ( s , p , o ) )

        # Add human readable lable
        p = RDFS.label
        o = Literal( str( sh_facility.cell_value( 1 , 4 ) ).replace(" ", "_") )
        g.add( ( s , p , o ) )

        # Add building
        buiID = str( sh_facility.cell_value( 1 , 17 ) )
        s = FDG[ buiID ]
        p = RDF.type
        o = BRICK[ "Building" ]
        g.add( ( s , p , o ) )

        # Add human readable lable
        p = RDFS.label
        o = Literal( str( sh_facility.cell_value( 1 , 0 ) ).replace(" ", "_") )
        g.add( ( s , p , o ) )

        # Add the fact that the building is located at the defined site:
        s = FDG[ siteID ]
        p = BRICK[ "hasPart" ]
        o = FDG[ buiID ]
        g.add( ( s , p , o ) )


        # ####################################################
        # 3. Inject in instances of the building storeys while
        # maintaining reference to their IFC id:
        #
        # ####################################################
        # Navigate to building storeys sheet
        sh_BuiStor = self.workbook.sheet_by_name( "Floor" )

        for i in tqdm(range( 1 , sh_BuiStor.nrows , 1 ), desc=Fore.GREEN + "🚀 Injecting semantics into the " + Fore.YELLOW + "FLOOR" + Fore.GREEN +" sheet"):
            # create storey instance
            BuiStorID = str( sh_BuiStor.cell_value( i , 6 ) )
            s = FDG[ BuiStorID ]
            p = RDF.type
            o = BRICK[ "Floor" ]
            g.add( ( s , p , o ) )

            # Add human readable label
            p = RDFS.label
            o = Literal( str( sh_BuiStor.cell_value( i , 0 ) ).replace(" ", "_") )
            g.add( ( s , p , o ) )
            
            # Link storey to building
            s = FDG[ buiID ]
            p = BRICK[ "hasPart" ]
            o = FDG[ BuiStorID ]
            g.add( ( s , p , o ) )


        # ####################################################
        # 4. Having creating bot:storey instances, we can 
        # start to enrich the semantics of spatial information 
        # by injecting in temp and humidity information. You 
        # can extend this however you like depending on the 
        # available spatial information you have. Finally we 
        # can extract the spaces together with their injected 
        # information:
        #
        # ####################################################
        # Navigate to building 'space' sheet
        sh_Space = self.workbook.sheet_by_name( "Space" )

        for i in tqdm(range( 1 , sh_Space.nrows , 1 ), desc=Fore.GREEN + "🚀 Injecting semantics into the " + Fore.YELLOW +"SPACE" + Fore.GREEN + " sheet"):
            # Security hack
            if str( sh_Space.cell_value( i , 8 ) ) == "n/a":
                break
            
            # create space as a BRICK space instance
            SpaceID = str( sh_Space.cell_value( i , 8 ) )
            s = FDG[ SpaceID ]
            p = RDF.type
            o = BRICK[ "Space" ]
            g.add( ( s , p , o ) )

            # Add human readable label(SPACE NAME concat with SPACE USAGE)
            p = RDFS.label
            o = Literal( str( sh_Space.cell_value( i , 0 ) ) + "-" + str( sh_Space.cell_value( i , 5 ) ).replace(" ", "_").replace(".", "_") )
            g.add( ( s , p , o ) )

            # ! BRICK lacks formal semantics for describing a a space as a 
            # ! a feature of interest with some measurable properties (eg temperature or Humidity)
            # ! SOSA and SSN are invoked for this purpose
            # * Assumption: all spaces are features of interest with measurable properties temperature
            # * and humidty

            # make the space a SOSA feature of interest
            p = RDF.type
            o = SOSA[ "FeatureOfInterest" ]
            g.add( ( s , p , o ) )


            # create a measurable space property instance (temp) by appending "-temp" to the space's IFC GUID
            TempPropertyID = str( sh_Space.cell_value( i , 8 ) ) + "-temp"   
            s = FDG[ TempPropertyID ]
            p = RDF.type
            o = SSN[ "Property" ]
            g.add( ( s , p , o ) )

            # create a measurable space property instance (hum) by appending "-hum" to the space's IFC GUID
            HumPropertyID = str( sh_Space.cell_value( i , 8 ) ) + "-hum"   
            s = FDG[ HumPropertyID ]
            p = RDF.type
            o = SSN[ "Property" ]
            g.add( ( s , p , o ) )

            # Link temp prop to space 
            s = FDG[ SpaceID ]
            p = SSN[ "hasProperty" ]
            o = FDG[ TempPropertyID ]
            g.add( ( s , p , o ) )

            # Link hum prop to space
            s = FDG[ SpaceID ]
            p = SSN[ "hasProperty" ]
            o = FDG[ HumPropertyID ]
            g.add( ( s , p , o ) )

            # Link Space to its containing floor
            # Get the label of the floor which contains the space
            BuiStorLabelRef = str( sh_Space.cell_value( i , 4 ) )

            # First go back to the Floor sheet, 
            # find the ID of the Floor which contains the space 
            # and create a BRICK semantic link link between that floor and the space 
            for j in range( 1 , sh_BuiStor.nrows , 1 ):

                # label of the floor in the floor sheet
                BuiStorLabel = str( sh_BuiStor.cell_value( j , 0 ) )

                # if the floor label in floor sheet matches the label of the floor
                # which contains the space, find the ID of that floor
                # and create the semantic link
                if BuiStorLabelRef == BuiStorLabel:
                    # ID of the floor
                    BuiStorIDToLink = str( sh_BuiStor.cell_value( j , 6 ) )
                    
                    # SEMANTIC LINK between space and the floor
                    s = FDG[ SpaceID ]
                    p = BRICK[ "isPartOf" ]
                    o = FDG[ BuiStorIDToLink ]
                    g.add( ( s , p , o ) )


        # ####################################################
        # 4. Semantically describe zonal information using
        # BRICK and link the zones to the spaces contained in
        # them.
        # ####################################################
        # Navigate to building 'Zone' sheet
        sh_Zone = self.workbook.sheet_by_name( "Zone" )
        for i in tqdm(range( 1 , sh_Zone.nrows , 1 ), desc=Fore.GREEN + "🚀 Injecting semantics into the " + Fore.YELLOW + "ZONE" + Fore.GREEN + " sheet"):
            # create zone as BRICK zone instance
            ZoneID = str( sh_Zone.cell_value( i , 7 ) )
            s = FDG[ ZoneID ]
            p = RDF.type
            o = BRICK[ "Zone" ]
            g.add( ( s , p , o ) )

            # Add human readable label(ZONE NAME concat with ZONE CATEGORY)
            p = RDFS.label
            o = Literal( str( sh_Zone.cell_value( i , 0 ) ) + "-" + str( sh_Zone.cell_value( i , 3 ) ).replace(" ", "_").replace(".", "_") )
            g.add( ( s , p , o ) )

            # Link Zone to the spaces it contains
            # Get the label of the space which is contained in zone
            SpaceLabelRef = str( sh_Zone.cell_value( i , 4 ) )

            # First go back to the space sheet, 
            # find the ID of the space which is contained in the zone 
            # and create a BRICK semantic link between that space and the zone
            for j in range( 1 , sh_Space.nrows , 1 ):

                # label of the space in the spaces sheet
                SpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                # if the space label in space sheet matches the label of the space
                # which is contained in the zone, find the ID of that space
                # and create the semantic link with the zone
                if SpaceLabelRef == SpaceLabel:
                    # ID of the space
                    SpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                    
                    # SEMANTIC LINK between space and the floor
                    s = FDG[ ZoneID ]
                    p = BRICK[ "hasPart" ]
                    o = FDG[ SpaceIDToLink ]
                    g.add( ( s , p , o ) )
        

        # ####################################################
        # 4. Semantically describe components using
        # BRICK and link them to the spaces in which they are 
        # contained. 
        # ####################################################
        # Navigate to building 'Component' sheet

        sh_Component = self.workbook.sheet_by_name( "Component" )

        for i in tqdm(range( 1 , sh_Component.nrows , 1 ), desc=Fore.GREEN + "🚀 Injecting semantics into the " + Fore.YELLOW + "COMPONENT" + Fore.GREEN + " sheet"):

            """
            ALL AIR DIFFUSERS(SUPPLY AND RETURN)

            M_Return Diffuser_600 x 600 Face 300 x 300 Connection

            Supply Diffuser 600 Face
            Supply Diffuser Sidewall 800 mm
            Supply Diffuser Sidewall Standard
            Supply Diffuser Sidewall 400mm
            Supply Diffuser Sidewall 200mm

            Return Diffuser 200 Face
            Return Diffuser 500 Face
            Return Diffuser 300 Face
            Return Diffuser 400 Face
            Return Diffuser 150 Face
            Return Diffuser 350 Face
            Return Diffuser 450 Face
            """

            if "Diffuser" in str( sh_Component.cell_value( i , 3 ) ):

                # Create air diffuser as BRICK air_diffuser instance
                DiffuserComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ DiffuserComponentID ]
                p = RDF.type
                o = BRICK[ "Air_Diffuser" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the diffuser and the space where it is located.
                # Get the label of the space where the component is located
                DiffuserComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    DiffuserComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if DiffuserComponentSpaceLabelRef == DiffuserComponentSpaceLabel:
                        # ID of the space
                        DiffuserComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the diffuser
                        s = FDG[ DiffuserComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ DiffuserComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )


            """
            ALL VAVs

            VAV 100 mm
            VAV 125 mm
            VAV 225 mm
            VAV 175 mm
            VAV 150 mm
            VAV 200 mm
            VAV 250 mm
            VAV 300 mm
            VAV 350 mm
            VAV 400 mm
            """
            if "VAV" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a VAV as BRICK VAV instance
                VAVComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ VAVComponentID ]
                p = RDF.type
                o = BRICK[ "Variable_Air_Volume_Box" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the VAV and the space where it is located.
                # Get the label of the space where the component is located
                VAVComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    VAVComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if VAVComponentSpaceLabelRef == VAVComponentSpaceLabel:
                        # ID of the space
                        VAVComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the VAV
                        s = FDG[ VAVComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ VAVComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            ALL AHUs

            AHU
            """
            if "AHU" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a AHU as BRICK AHU instance
                AHUComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ AHUComponentID ]
                p = RDF.type
                o = BRICK[ "Air_Handling_Unit" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the AHU and the space where it is located.
                # Get the label of the space where the component is located
                AHUComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    AHUComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if AHUComponentSpaceLabelRef == AHUComponentSpaceLabel:
                        # ID of the space
                        AHUComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the AHU
                        s = FDG[ AHUComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ AHUComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )


            """
            ALL Chillers

            Chillers
            """
            if "Chiller" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Chiller as BRICK Chiller instance
                ChillerComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ ChillerComponentID ]
                p = RDF.type
                o = BRICK[ "Chiller" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Chiller and the space where it is located.
                # Get the label of the space where the component is located
                ChillerComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    ChillerComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if ChillerComponentSpaceLabelRef == ChillerComponentSpaceLabel:
                        # ID of the space
                        ChillerComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Chiller
                        s = FDG[ ChillerComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ ChillerComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )


            """
            ALL Cold Water Pumps

            Pump- Cold Water
            """
            if "Pump- Cold Water" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a CWP as BRICK CWP instance
                CWPComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ CWPComponentID ]
                p = RDF.type
                o = BRICK[ "Chilled_Water_Pump" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the CWP and the space where it is located.
                # Get the label of the space where the component is located
                CWPComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    CWPComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if CWPComponentSpaceLabelRef == CWPComponentSpaceLabel:
                        # ID of the space
                        CWPComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the CWP
                        s = FDG[ CWPComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ CWPComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            ALL Hot Water Pumps

            Pump- Hot Water
            """
            if "Pump- Hot Water" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a HWP as BRICK HWP instance
                HWPComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ HWPComponentID ]
                p = RDF.type
                o = BRICK[ "Hot_Water_Pump" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the HWP and the space where it is located.
                # Get the label of the space where the component is located
                HWPComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    HWPComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if HWPComponentSpaceLabelRef == HWPComponentSpaceLabel:
                        # ID of the space
                        HWPComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the HWP
                        s = FDG[ HWPComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ HWPComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            ALL Condensers

            Air Cooled Condensing Unit
            """
            if "Condensing" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Condenser as BRICK Condenser instance
                CondenserComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ CondenserComponentID ]
                p = RDF.type
                o = BRICK[ "Condenser" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Condenser and the space where it is located.
                # Get the label of the space where the component is located
                CondenserComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    CondenserComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if CondenserComponentSpaceLabelRef == CondenserComponentSpaceLabel:
                        # ID of the space
                        CondenserComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Condenser
                        s = FDG[ CondenserComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ CondenserComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            ALL Boilers

            Boilers
            """
            if "Boiler" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Boiler as BRICK Boiler instance
                BoilerComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ BoilerComponentID ]
                p = RDF.type
                o = BRICK[ "Boiler" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Boiler and the space where it is located.
                # Get the label of the space where the component is located
                BoilerComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    BoilerComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if BoilerComponentSpaceLabelRef == BoilerComponentSpaceLabel:
                        # ID of the space
                        BoilerComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Boiler
                        s = FDG[ BoilerComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ BoilerComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            M_Round Elbow_2 D HVAC Duct fittings
            """
            if "M_Round Elbow_2 D" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Elbow as SAREF4BLDG Elbow instance
                MRoundElbowComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ MRoundElbowComponentID ]
                p = RDF.type
                o = SAREF4BLDG[ "DistributionFlowDevice" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Elbow and the space where it is located.
                # Get the label of the space where the component is located
                MRoundElbowComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    MRoundElbowComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if MRoundElbowComponentSpaceLabelRef == MRoundElbowComponentSpaceLabel:
                        # ID of the space
                        MRoundElbowComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Elbow
                        s = FDG[ MRoundElbowComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ MRoundElbowComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            Radius Elbows / Taps HVAC Duct fittings
            """
            if "Radius Elbows / Taps" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Elbow as SAREF4BLDG Elbow instance
                RadiusElbowComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ RadiusElbowComponentID ]
                p = RDF.type
                o = SAREF4BLDG[ "DistributionFlowDevice" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Elbow and the space where it is located.
                # Get the label of the space where the component is located
                RadiusElbowComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    RadiusElbowComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if RadiusElbowComponentSpaceLabelRef == RadiusElbowComponentSpaceLabel:
                        # ID of the space
                        RadiusElbowComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Elbow
                        s = FDG[ RadiusElbowComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ RadiusElbowComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            Mitered Elbows / Tees HVAC Duct fittings
            """
            if "Mitered Elbows / Tees" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Elbow as SAREF4BLDG Elbow instance
                MiteredTeeElbowComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ MiteredTeeElbowComponentID ]
                p = RDF.type
                o = SAREF4BLDG[ "DistributionFlowDevice" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Elbow and the space where it is located.
                # Get the label of the space where the component is located
                MiteredTeeElbowComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    MiteredTeeElbowComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone.
                    if MiteredTeeElbowComponentSpaceLabelRef == MiteredTeeElbowComponentSpaceLabel:
                        # ID of the space
                        MiteredTeeElbowComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Elbow
                        s = FDG[ MiteredTeeElbowComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ MiteredTeeElbowComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )


            """
            Mitered Elbows / Taps HVAC Duct fittings
            """
            if "Mitered Elbows / Taps" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Elbow as SAREF4BLDG Elbow instance
                MiteredTapElbowComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ MiteredTapElbowComponentID ]
                p = RDF.type
                o = SAREF4BLDG[ "DistributionFlowDevice" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Elbow and the space where it is located.
                # Get the label of the space where the component is located
                MiteredTapElbowComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    MiteredTapElbowComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if MiteredTapElbowComponentSpaceLabelRef == MiteredTapElbowComponentSpaceLabel:
                        # ID of the space
                        MiteredTapElbowComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Elbow
                        s = FDG[ MiteredTapElbowComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ MiteredTapElbowComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

            """
            ALL Radius HVAC Duct fittings

            Taps / Short Radius
            """
            if "Radius" in str( sh_Component.cell_value( i , 3 ) ):

                # Create a Radius as SAREF4BLDG Radius instance
                RadiusComponentID = str( sh_Component.cell_value( i , 8 ) )
                s = FDG[ RadiusComponentID ]
                p = RDF.type
                o = SAREF4BLDG[ "DistributionFlowDevice" ]
                g.add( ( s , p , o ) )

                # Add human readable label(COMPONENT NAME)
                p = RDFS.label
                o = Literal( str( sh_Component.cell_value( i , 0 ) ).replace(" ", "_").replace(".", "_") )
                g.add( ( s , p , o ) )

                # Create a BRICK Link btn the Radius and the space where it is located.
                # Get the label of the space where the component is located
                RadiusComponentSpaceLabelRef = str( sh_Component.cell_value( i , 4 ) )

                # First go back to the space sheet, 
                # find the ID of the space which is contained in the zone 
                # and create a BRICK semantic link between that space and the zone
                for j in range( 1 , sh_Space.nrows , 1 ):

                    # label of the space in the spaces sheet
                    RadiusComponentSpaceLabel = str( sh_Space.cell_value( j , 0 ) )

                    # if the space label in space sheet matches the label of the space
                    # which is contained in the zone, find the ID of that space
                    # and create the semantic link with the zone
                    if RadiusComponentSpaceLabelRef == RadiusComponentSpaceLabel:
                        # ID of the space
                        RadiusComponentSpaceIDToLink = str( sh_Space.cell_value( j , 8 ) )
                        
                        # SEMANTIC LINK between space and the Radius
                        s = FDG[ RadiusComponentID ]
                        p = BRICK[ "isPartOf" ]
                        o = FDG[ RadiusComponentSpaceIDToLink ]
                        g.add( ( s , p , o ) )

        # # ####################################################
        # # 4. Semantically describe Systems using
        # # BRICK and link them to the components which they 
        # # are composed of 
        # # ####################################################
        # # Navigate to building 'System' sheet

        # sh_System = self.workbook.sheet_by_name( "System" )

        # for i in tqdm(range( 1 , sh_System.nrows , 1 ), desc="🚀 Injecting semantics into the building's HVAC system and its components"):   
            
        #     # system name
        #     systemName = str( sh_System.cell_value( i , 0 ) ) 
            
        #     # we focus only on HVAC systems  
        #     if systemName == "HVAC":
        #         # ID of the HVAC system
        #         SystemID = str( sh_System.cell_value( i , 7 ) )

        #         # create space as a BRICK HVAC system instance
        #         s = FDG[ SystemID ]
        #         p = RDF.type
        #         o = BRICK[ "HVAC" ]
        #         g.add( ( s , p , o ) )

        #         # Add human readable label(SYSTEM NAME)
        #         p = RDFS.label
        #         o = Literal( str( sh_System.cell_value( i , 0 ) ) )
        #         g.add( ( s , p , o ) )

        #         # Link the System to the components contained within
        #         # Get the label of the component contained within a system
        #         ComponentLabelRef = str( sh_System.cell_value( i , 4 ))

        #     # First go back to the component sheet, 
        #     # find the ID of the component contained in the HVAC system 
        #     # and create a BRICK semantic link link between that component and the HVAC system 
        #     for j in tqdm(range( 1 , sh_Component.nrows , 1 ), desc="🚥Linking a system to its components"):

        #         # label of the component in the component sheet
        #         ComponentLabel = str( sh_Component.cell_value( j , 0 ) )

        #         # if the component label in component sheet matches the label of the component
        #         # contained in the system, find the ID of that component
        #         # and create the semantic link
        #         if ComponentLabelRef == ComponentLabel:
        #             # ID of the component
        #             ComponentIDToLink = str( sh_Component.cell_value( j , 8 ) )
                    
        #             # SEMANTIC LINK between system and the component
        #             s = FDG[ SystemID ]
        #             p = BRICK[ "hasPart" ]
        #             o = BRICK[ ComponentIDToLink ]
        #             g.add( ( s , p , o ) )


        print (Style.DIM + "🌟 SEMANTIC INJECTION COMPLETE 🌟")
            # Location
            # Sensor Type
            # Mechanical Equipment
        return g

        