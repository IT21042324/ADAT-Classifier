from fastapi import FastAPI, HTTPException
# uvicorn is to create a server to test our fastAPI 
import uvicorn

# Create a FASTAPI app
app = FastAPI()

# This is how we define a path
@app.get('/')
def root():
    return {'Hello' : 'World'}

items = []

@app.post('/items')
def add_item(item: str):
    items.append(item)
    return items 

# @app.get('/items/{item_id}')
# def getItemById(item_id: int) -> str:
#     # ->str means this function is expecting to return str here
#     return items[item_id]

# lets rasie proper errors when items is not found

@app.get('/items/{item_id}')
def getItemById(item_id: int):
    if item_id < len(items):
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail=f'Item ID: {item_id} not found. Use a differnt Item ID')

@app.get('/items')
def getLimitedItems(limit: int = 10):
    # so tis will be taking limit value through query parameter
    return items[:limit] 


# if we want our input to be of a specific type we can use pydantic
from pydantic import BaseModel

class Item (BaseModel):
    name: str
    price: float
    is_offer: bool = False
    
# now when creating an item, instead of taking string like the above, we can specify the Item class itself
@app.post('/items/add')
def add_item(item: Item):
    items.append(item)
    return items

# here we cant pass the item object through query. we need to use the payload to send the request to server


# To sending response we need the BaseModel itself. we say request_model parameter so that it will confirm the response type return from the api function

# to run the server type uvicorn file_name:app --reload (reload  is done to restart server for eery save)