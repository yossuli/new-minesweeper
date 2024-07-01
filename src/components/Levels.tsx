type props = {
  levelsData: { level: string; data: { width: number; height: number } }[];
  levelSelect: (data: { width: number; height: number }) => void;
  customSelect: () => void;
};

export const Levels = ({ levelsData, levelSelect, customSelect }: props) => (
  <div>
    {levelsData.map((levelData) => (
      <button onClick={() => levelSelect(levelData.data)} key={levelData.level}>
        {levelData.level}
      </button>
    ))}
    <button onClick={customSelect}>カスタム</button>
  </div>
);
