from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import signal
from django.conf import settings

from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Lipinski
from rdkit.Chem import PyMol
from rdkit.Chem import AllChem
from rdkit.Chem import PandasTools
from rdkit.Chem import Descriptors
from rdkit.Chem  import rdFreeSASA
import requests

# def ints(request):
#     os.environ['init_path'] = os.path.join(os.getcwd(), 'inputdata', 'my_chem.*')
#     os.environ['outpath'] = os.path.join(os.getcwd(), 'Chem', 'static', 'Chem', 'data')
#     os.system('cp $init_path $outpath')
#     return render(request, 'Chem/index.html', {'host':request.get_host()})

def ints(request):
    data = SDF_reader(os.path.join(os.getcwd(), 'Chem', 'static', 'Chem', 'data', 'Example.sdf'))
    return render(request, 'Chem/index.html', {'data':data[0], 'mols':list(data.keys())})

def properties(request):
    return render(request, 'Chem/table-export.html', {})

@csrf_exempt
def post_form_api(request):  

    if request.method == "POST":
        form = request.POST
        if form:
            out_file_path = os.path.join(settings.STATIC_ROOT, 'out', 'chem.*')

            if os.path.exists(out_file_path):
                os.remove(out_file_path)

            f =  open(out_file_path, 'w')

            print("OKK")

            print(form.dict()['file'])

            f.write(form.dict()['file'])
            f.close()

            return JsonResponse(form.dict(), status=201)
        return JsonResponse('error', status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def close_server(request):
    if request.method == "POST":
        form = request.POST
        if form:
            os.kill(os.getpid(), signal.SIGINT)
            return JsonResponse(form.dict(), status=201)
        return JsonResponse('error', status=400)
    else:
        return None


@csrf_exempt
def load_chem(request):
    id = request.GET.get('id')
    data = SDF_reader(os.path.join(os.getcwd(), 'Chem', 'static', 'Chem', 'data', 'Example.sdf'))
    properties = GetSDFProperties(data[int(id)])


    return JsonResponse({'mol':"".join(data[int(id)]), "properties":properties}, status=201)
    # return render(request, 'Chem/index.html', {'mol':"".join(data[int(id)]), "properties":properties,'mols':list(data.keys())})

def  SDF_reader(infile):
    f = open(infile)
    lines = f.readlines()
    counter = 0 
    l = []
    d = {}

    for line in lines:
        if '$$$$' in line:
            counter = counter + 1
            l = []
        else: 
            l.append(line)
            d[counter] = l
    return d

def GetSDFProperties(lines):
    keys = {}
    temp = []
    for i, x in enumerate (lines):
        if '> <' in x:
            temp.append(i)
    for j, x in enumerate(temp):
        try:
            keys[lines[temp[j]].replace('> <', '').replace('>\n', '')] = lines[temp[j]+1: temp[j+1]-1] 
        except:
            pass
    return keys

def smi_reader():

    f = open("Example.sdf")
    lines = f.readlines()

    data = {}

    test = ['mole_1,slkdfskljfs']

    for t in test:
        data[t.split(',')[0]] = t.split(',')[1]

@csrf_exempt
def return_properties(request):
    if request.method == "POST":
        form = request.POST
        if form:     
            mol = Chem.MolFromMolBlock(form.dict()['file'])
            img = Draw.MolToImage(mol)
            img.save('3d_structure.png')

            Draw.MolToImageFile(mol, '3d.png')

            AllChem.EmbedMolecule(mol)
            AllChem.MMFFOptimizeMolecule(mol)

            return JsonResponse({'mol': Chem.MolToMolBlock(mol)}, status=201)
        return JsonResponse('error', status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

    
@csrf_exempt
def fetch_pub_chem(request):
    if request.method == "POST":
        form = request.POST
        if form:   
            print(form.dict()['id']) 
            url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{form.dict()['id']}/record/SDF/?record_type=3d"
            response = requests.get(url)

            if response.status_code == 200:
                # Retrieve the SDF data
                sdf_data = response.text

                return JsonResponse({'mol': sdf_data}, status=201)
        return JsonResponse('error', status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def mol_properties(request):
    if request.method == "POST":
        form = request.POST
        if form:     
   
            mol = Chem.MolFromMolBlock(form.dict()['file'])

            properties = {
                "mw": round(Descriptors.MolWt(mol),3),
                "lp": round(Descriptors.MolLogP(mol), 3),       
                "NHA": Descriptors.NumHAcceptors(mol),           
                "NHD": Descriptors.NumHDonors(mol)  
            }

            # print(round(Descriptors.MaxPartialCharge(mol), 3))

            return JsonResponse(properties, status=201)
        return JsonResponse('error', status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
