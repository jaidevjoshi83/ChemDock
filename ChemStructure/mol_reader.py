def  SDF_reader():
    f = open("Example.sdf")
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

data = SDF_reader()
new = GetSDFProperties(data[0])

print(new[new.keys()[13]])

def smi_reader():

    f = open("Example.sdf")
    lines = f.readlines()

    data = {}

    test = ['mole_1,slkdfskljfs']

    for t in test:
        data[t.split(',')[0]] = t.split(',')[1]
        
   
