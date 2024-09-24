from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.place_model import Place
from schemas.place_schema import PlaceCreate, PlaceUpdate

class PlaceController:

    @staticmethod
    def getAll_place(db: Session):
        place = db.query(Place).all()
        return place
    
    @staticmethod
    def create_place(db: Session, place: PlaceCreate):
        db_place = Place(**place.dict())
        existing_place = db.query(Place).filter(Place.place_name == place.place_name).first()
        if existing_place is not None :
            raise HTTPException(status_code=404, detail="data is already")
        db.add(db_place)
        db.commit()
        db.refresh(db_place)
        return db_place

    @staticmethod
    def getById_place(db: Session, place_id: int):
        place = db.query(Place).filter(Place.place_id == place_id).first()
        if place is None:
            raise HTTPException(status_code=404, detail="Place not found")
        return place

    @staticmethod
    def update_place(db: Session, place_id: int, place: PlaceUpdate):
        db_place = db.query(Place).filter(Place.place_id == place_id).first()
        if db_place is None:
            raise HTTPException(status_code=404, detail="Equipment not found")

        for key, value in place.dict(exclude_unset=True).items():
            setattr(db_place, key, value)

        db.commit()
        db.refresh(db_place)
        return db_place

    @staticmethod
    def delete_place(db: Session, place_id: int):
        db_place = db.query(Place).filter(Place.place_id == place_id).first()
        if db_place is None:
            raise HTTPException(status_code=404, detail="Place not found")

        db.delete(db_place)
        db.commit()
        return {"detail": "Place deleted"}
