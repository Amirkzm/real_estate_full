import { useMemo, useState } from "react";
import "./tabSelector.scss";

type TabSelectorProps = {
  selectedTab?: number;
  setSelectedTab?: (tabIndex: number) => void;
  tabTitles: string[];
};

const TabSelector: React.FC<TabSelectorProps> = ({
  selectedTab,
  setSelectedTab,
  tabTitles,
}) => {
  const [clickedTab, setClickedTab] = useState<number>(selectedTab || 0);
  const tabs = useMemo(
    () =>
      Array.from({ length: tabTitles.length }, (_: unknown, i: number) => i),
    [tabTitles.length]
  );

  const tabClickHandler = (tabIndex: number) => {
    setClickedTab(tabIndex);
    setSelectedTab && setSelectedTab(tabIndex);
  };

  return (
    <div className="tabsWrapper">
      {tabs.map((tabIndex: number) => (
        <button
          key={tabIndex}
          onClick={() => tabClickHandler(tabIndex)}
          className={tabIndex === clickedTab ? "tab active" : "tab"}
        >
          {tabTitles[tabIndex]}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
