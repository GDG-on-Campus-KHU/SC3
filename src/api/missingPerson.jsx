const API_BASE_URL = "/api";

export const fetchMissingPersons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/db/missing/recent/list`);
    if (!response.ok) throw new Error("Failed to fetch missing persons");

    const data = await response.json();
    return data.message.map(parsePersonData);
  } catch (error) {
    console.error("Error fetching missing persons:", error);
    throw error;
  }
};

// Description 파싱 함수
const parseDescription = (description) => {
  const heightMatch = description.match(/(\d+)cm/);
  const weightMatch = description.match(/(\d+)kg/);

  const height = heightMatch ? parseInt(heightMatch[1]) : null;
  const weight = weightMatch ? parseInt(weightMatch[1]) : null;

  // 키와 몸무게 제거 후 남은 부분을 인상착의로
  let appearance = description
    .replace(/\d+cm/, "")
    .replace(/\d+kg/, "")
    .replace(/,,/g, ",")
    .replace(/^,+|,+$/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item)
    .join(", ");

  return {
    height,
    weight,
    appearance,
  };
};

// 날짜 포맷팅 함수
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\. /g, "-")
    .replace(".", "");
};

// 개별 실종자 데이터 파싱
const parsePersonData = (data) => {
  const { height, weight, appearance } = parseDescription(data.Missing.Description);

  return {
    id: data.SN,
    lastSeen: formatTimestamp(data.Timestamp),
    address: data.Region[0], // 지역에 여러 개인 경우 첫 번째 지역 사용
    name: data.Missing.Name,
    age: data.Missing.Age,
    gender: data.Missing.Sex,
    height,
    weight,
    appearance,
    image: "/image.png",
  };
};
