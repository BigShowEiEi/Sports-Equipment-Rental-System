from pydantic import BaseModel

class EquipmentBase(BaseModel):
    equipment_name: str

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    equipment_name: str = None

class Equipment(EquipmentBase):
    equipment_id: int

    class Config:
        from_attributes  = True
