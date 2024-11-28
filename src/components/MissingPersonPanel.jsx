import PropTypes from "prop-types";
import { Clock, MapPin, Ruler, Weight, ClipboardList } from "lucide-react";
import styled from "styled-components";

export const PanelContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 40px;
  width: 420px;
  max-height: calc(100vh - 40px);
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1000;
  backdrop-filter: blur(5px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  padding: 20px;
  background: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const PersonList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PersonCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const PersonImageContainer = styled.div`
  flex-shrink: 0;
  width: 120px;
`;

export const PersonImage = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
`;

export const PersonDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const PersonName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const BaseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #555;
  font-size: 15px;
`;

export const PersonInfo = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 4px 0;
  line-height: 1.4;
`;

export const LastSeen = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  font-size: 14px;
`;

const MOCK_DATA = [
  {
    name: "김철수",
    age: 65,
    gender: "남성",
    weight: 68,
    height: 176,
    lastSeen: "2024-11-28 14:30",
    location: "부산광역시 사하구",
    description: "검은색 점퍼, 청바지",
    image: "/api/placeholder/120/150",
  },
  {
    name: "이영희",
    age: 8,
    gender: "여성",
    weight: 28,
    height: 125,
    lastSeen: "2024-11-28 14:30",
    location: "부산광역시 사하구",
    description: "분홍색 외투, 흰색 운동화",
    image: "/api/placeholder/120/150",
  },
];

const MissingPersonPanel = ({ onSelectPerson }) => {
  return (
    <PanelContainer>
      <Header>
        <Title>실종자 목록</Title>
      </Header>
      <PersonList>
        {MOCK_DATA.map((person) => (
          <PersonCard key={person.id} onClick={() => onSelectPerson(person)}>
            <PersonImageContainer>
              <PersonImage src={person.image} alt={person.name} />
            </PersonImageContainer>
            <PersonDetails>
              <NameContainer>
                <PersonName>{person.name}</PersonName>
                <BaseInfo>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {person.age}세 {person.gender}
                  </div>
                </BaseInfo>
              </NameContainer>

              <InfoContainer>
                <InfoRow>
                  <Ruler size={12} color="#7f8c8d" />
                  {person.height}cm
                  <Weight size={12} style={{ marginLeft: "8px" }} color="#7f8c8d" />
                  {person.weight}kg
                </InfoRow>

                <InfoRow>
                  <ClipboardList size={12} color="#7f8c8d" />
                  {person.description}
                </InfoRow>

                <InfoRow>
                  <MapPin size={12} color="#7f8c8d" />
                  {person.location}
                </InfoRow>
              </InfoContainer>

              <LastSeen>
                <Clock size={12} color="#7f8c8d" />
                최종목격: {person.lastSeen}
              </LastSeen>
            </PersonDetails>
          </PersonCard>
        ))}
      </PersonList>
    </PanelContainer>
  );
};

MissingPersonPanel.propTypes = {
  onSelectPerson: PropTypes.func.isRequired,
};

export default MissingPersonPanel;
