import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import MinMaxScaler

df = pd.read_csv("dataset_script.csv")

features = df[[
    "entrada_minutos",
    "salida_minutos",
    "ausente",
    "ausencias_consecutivas",
    "llegadas_tarde_consecutivas",
    "salidas_tempranas_consecutivas"
]]

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(features)

model = IsolationForest(contamination=0.1, random_state=42)
df["anomaly"] = model.fit_predict(X_scaled)
df["anomaly"] = df["anomaly"].map({1: "Normal", -1: "Anomalía"})

df.to_excel("resultados.xlsx", index=False)
print("✅ Resultados exportados como 'resultados.xlsx'")
