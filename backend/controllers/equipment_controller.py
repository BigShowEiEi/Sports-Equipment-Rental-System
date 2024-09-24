from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.equipment_model import Equipment
from schemas.equipment_schema import EquipmentCreate, EquipmentUpdate

class EquipmentController:

    @staticmethod
    def getAll_equipment(db: Session):
        equipment = db.query(Equipment).all()
        return equipment
    
    @staticmethod
    def create_equipment(db: Session, equipment: EquipmentCreate):
        db_equipment = Equipment(**equipment.dict())
        existing_equipment = db.query(Equipment).filter(Equipment.equipment_name == equipment.equipment_name).first()
        if existing_equipment is not None :
            raise HTTPException(status_code=404, detail="data is already")
        db.add(db_equipment)
        db.commit()
        db.refresh(db_equipment)
        return db_equipment

    @staticmethod
    def getById_equipment(db: Session, equipment_id: int):
        equipment = db.query(Equipment).filter(Equipment.equipment_id == equipment_id).first()
        if equipment is None:
            raise HTTPException(status_code=404, detail="Equipment not found")
        return equipment

    @staticmethod
    def update_equipment(db: Session, equipment_id: int, equipment: EquipmentUpdate):
        db_equipment = db.query(Equipment).filter(Equipment.equipment_id == equipment_id).first()
        if db_equipment is None:
            raise HTTPException(status_code=404, detail="Equipment not found")

        for key, value in equipment.dict(exclude_unset=True).items():
            setattr(db_equipment, key, value)

        db.commit()
        db.refresh(db_equipment)
        return db_equipment

    @staticmethod
    def delete_equipment(db: Session, equipment_id: int):
        db_equipment = db.query(Equipment).filter(Equipment.equipment_id == equipment_id).first()
        if db_equipment is None:
            raise HTTPException(status_code=404, detail="Equipment not found")

        db.delete(db_equipment)
        db.commit()
        return {"detail": "Equipment deleted"}
