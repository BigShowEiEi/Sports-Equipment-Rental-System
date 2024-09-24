from pydantic import BaseModel

class PlaceBase(BaseModel):
    place_name: str

class PlaceCreate(PlaceBase):
    pass

class PlaceUpdate(BaseModel):
    place_name: str = None

class Place(PlaceBase):
    place_id: int

    class Config:
        from_attributes  = True
