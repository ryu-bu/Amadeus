# Amadeus
PostgreSQL DB needed. 

1. Go to directory /backend/api after cloning the Amadeus project
```
cd api
 ```
 
2. Create python env through
```
python3 -m venv env
```

3. Activate python env
```
source env/bin/activate
```

4. Download dependencies
```
pip install -r requirements.txt
```

5. Append .env file in the backend/api folder. It should have 
```
DATABASE_URL=[your_postgres]
```

6. Run app.py
