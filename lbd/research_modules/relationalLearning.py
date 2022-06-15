# for working with rdf in python
from rdflib import Graph , Literal , BNode , Namespace , RDF , RDFS , OWL , XSD, URIRef
# progress bars
from tqdm.autonotebook import tqdm
from colorama import Fore, Back, Style

class RELATIONAL_LEARNING():
    def __init__(self, ttl):
        self.ttl = ttl
    
    def trainer(self):
        # ####################################################
        # 0. initiate the graph
        # 
        # ####################################################
        g = Graph()
        

        