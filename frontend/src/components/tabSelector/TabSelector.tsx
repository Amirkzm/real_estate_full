import { useMemo, useState } from "react";
import "./tabSelector.scss";

type TabSelectorProps = {
  numberOfTabs: number;
  selectedTab?: number;
  setSelectedTab?: (tabIndex: number) => void;
  tabTitles: string[];
};

const TabSelector: React.FC<TabSelectorProps> = ({
  numberOfTabs = 2,
  selectedTab,
  setSelectedTab,
  tabTitles,
}) => {
  const [clickedTab, setClickedTab] = useState<number>(selectedTab || 0);
  const tabs = useMemo(
    () => Array.from({ length: numberOfTabs }, (_: unknown, i: number) => i),
    [numberOfTabs]
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
          {tabTitles && tabTitles[tabIndex]}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
