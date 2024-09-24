from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Equipment(Base):
    __tablename__ = 'equipment'

    equipment_id = Column(Integer, primary_key=True, index=True)
    equipment_name = Column(String)

    place_equipments = relationship("PlaceEquipment", back_populates="equipment")
    
