import { useEffect } from "react";
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

const Header = styled.div`
  position: sticky;
  top: 0;
  padding: 20px;
  background: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const CountBadge = styled.span`
  background-color: #f1f5f9;
  color: #64748b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
`;

export const PersonList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PersonCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
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

const MissingPersonPanel = ({ persons, onPersonClick }) => {
  return (
    <PanelContainer>
      <Header>
        <Title>실종자 목록</Title>
        <CountBadge>{persons.length}명</CountBadge>
      </Header>
      <PersonList>
        {persons.length === 0 ? (
          <EmptyState>현재 지도 영역에 표시할 실종자 정보가 없습니다.</EmptyState>
        ) : (
          persons.map((person) => {
            return (
              <PersonCard key={person.name + person.lastSeen} onClick={() => onPersonClick(person)}>
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
                      {person.address}
                    </InfoRow>
                  </InfoContainer>

                  <LastSeen>
                    <Clock size={12} color="#7f8c8d" />
                    최종목격: {person.lastSeen}
                  </LastSeen>
                </PersonDetails>
              </PersonCard>
            );
          })
        )}
      </PersonList>
    </PanelContainer>
  );
};

MissingPersonPanel.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPersonClick: PropTypes.func.isRequired,
};

export default MissingPersonPanel;
