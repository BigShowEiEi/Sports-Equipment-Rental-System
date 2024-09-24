from sqlalchemy import Column, Integer
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class PlaceEquipment(Base):
    __tablename__ = 'place_equipment'

    place_equipment_id = Column(Integer, primary_key=True, index=True)
    place_id = Column(Integer, ForeignKey("place.place_id"))
    equipment_id = Column(Integer, ForeignKey("equipment.equipment_id"))
    stock = Column(Integer)
    available_stock = Column(Integer)

    place = relationship("Place", back_populates="place_equipments")
    equipment = relationship("Equipment", back_populates="place_equipments")