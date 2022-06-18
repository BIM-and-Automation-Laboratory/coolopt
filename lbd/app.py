# for reading excel sheets in python.
import xlrd
import os
import research_modules
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
from flask import Flask, flash, render_template, request, redirect, url_for

UPLOAD_FOLDER = "./cobie_sheets"
ALLOWED_EXTENSIONS = {'xls'}
ALLOWED_LBD_EXTENSIONS = {'ttl'}
MAX_CONTENT_LENGTH = 100000000

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
app.secret_key = 'super secret key' #TODO: Secure this key

api = Api(app)


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_lbd_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_LBD_EXTENSIONS

class SemanticInjection(Resource):
    def get(self):
        return {"response": "Welcome to the LBD-Semantic Injection API"}
        
    def post(self):
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)

            file = request.files['file']

            # check if file has a name
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)

            # check if cobie_sheets upload folder exists, if not, create it
            if not os.path.exists('cobie_sheets'):
                os.makedirs('cobie_sheets')

            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))

                # create xlrd workbook from COBie xls file
                workbook = xlrd.open_workbook("./cobie_sheets/{}".format(filename))

                # create an LBD object from our imported LBD class
                lbd_object = research_modules.LBD(workbook)

                # run the "semantics injector" method and return the lbd graph
                lbd_graph = lbd_object.injector()

                # check if the "cobie_lbds" upload folder exists, if not, create it
                if not os.path.exists('cobie_lbds'):
                    os.makedirs('cobie_lbds')

                # serialize the graph using turtle OR any other serialization and save it
                lbd_graph.serialize( destination = "./cobie_lbds/{}".format(filename.replace("xls", "ttl")) , format = "turtle" )

                return {"message": "COBie file converted successfully"}
            return {"message": "file-format-error"}
                
        return {"message": "something is wrong with your request..."}

class AskLBD(Resource):
    def get(self):
        query = """
        # Get all the air diffusers that are in space "1E24-RECEIVING_/_STORAGE"
        PREFIX bot: <https://w3id.org/bot#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX brick: <https://brickschema.org/schema/Brick#>
        PREFIX saref4bldg: <https://saref.etsi.org/saref4bldg/>
        PREFIX ssn: <http://www.w3.org/ns/ssn/>
        PREFIX sosa: <http://www.w3.org/ns/sosa/>

        SELECT ?spaceName ?zoneName ?diffuserName
        WHERE {
            ?space rdf:type brick:Space . 
            ?space rdfs:label "1E24-RECEIVING_/_STORAGE" .
            ?space rdfs:label ?spaceName .
            ?zone brick:hasPart ?space .
            ?zone rdfs:label ?zoneName .
            ?diffuser rdf:type brick:Air_Diffuser .
            ?diffuser brick:isPartOf ?space .
            ?diffuser rdfs:label ?diffuserName .  
        }
        LIMIT 4
        """
        lbd_graph_to_ask = research_modules.LBD("",'./cobie_lbds/cobie.ttl', query)

        lbd_graph_to_ask.ask()

        return {"message": "Query has run successfully"}

api.add_resource(SemanticInjection, "/api/lbd/semantic-injection")
api.add_resource(AskLBD, "/api/lbd/ask")

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # TODO:debug=True is only for development
