import joblib
import json
import os
from datetime import date, timedelta
import requests

# Function to get the meteorological data from the Open Meteo API
def getMeteo(lat, long, date_meteo):
    # dct = subprocess.check_output(['curl', f'https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={long}&start_date={date_meteo}&end_date={date_meteo}&hourly=temperature_2m,relativehumidity_2m'], stderr=subprocess.DEVNULL).decode()
    # dct = subprocess.check_output(['curl', f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=temperature_2m,relativehumidity_2m&forecast_days=1'], stderr=subprocess.DEVNULL).decode()
    dct = requests.get(f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=temperature_2m,relativehumidity_2m&forecast_days=1')

    dct = json.loads(dct.text)
    # print(dct)

    tempMedia = sum(dct['hourly']['temperature_2m'])/len(dct['hourly']['temperature_2m'])
    humiMedia = sum(dct['hourly']['relativehumidity_2m'])/len(dct['hourly']['relativehumidity_2m'])

    # print(tempMedia, humiMedia)

    return [float(tempMedia), float(humiMedia)]

# Try to open the input file

try:
    inputFile = open(os.path.join(os.path.dirname(__file__), 'dataVespa.json'))

    # Load the ML model and the scaler
    modelo = joblib.load(os.path.join(os.path.dirname(__file__), 'model01.vsp')) 
    scaler = joblib.load(os.path.join(os.path.dirname(__file__), 'scaler01.vsp'))
except:
    print('-1', end='')
    exit()

# Read the input file and convert to json
dataVespas = json.load(inputFile)

# print(dataVespas)

# Initialize the output json
inputValues = []

# For each item in the input json file
for item in dataVespas['itens']:

    # Get the meteorological data for the item
    # [temp, humi] = getMeteo(item['lat'], item['long'], str(date.today() - timedelta(days = 7)))
    [temp, humi] = getMeteo(item['lat'], item['long'], str(date.today()))

    # Append the input values to the input list
    inputValues.append([temp, humi, float(item['nvespas'])])

# Scale the input values and apply to the ML model
inputValues = scaler.transform(inputValues)
resultModel = modelo.predict(inputValues)
# print(resultModel)

i = 0
for item in dataVespas['itens']:
    # Add the result to the output json
    item['raio'] = resultModel[i]
    i += 1

# Build the output json
jsonOut = json.dumps(dataVespas, indent=2)
 
# Writing the output json to a file
with open(os.path.join(os.path.dirname(__file__), 'dataVespa.json'), 'w') as outfile:
    outfile.write(jsonOut)

# Print the number of items processed and exit
print(len(dataVespas['itens']), end='')
exit()