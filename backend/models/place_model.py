from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Place(Base):
    __tablename__ = 'place'

    place_id = Column(Integer, primary_key=True, index=True)
    place_name = Column(String)

    place_equipments = relationship("PlaceEquipment", back_populates="place")
