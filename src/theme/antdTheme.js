const antdTheme = {
  token: {
    colorPrimary: "#69c920",
    borderRadius: 8,
    fontSize: 14,
  },

  components: {
    Button: {
      colorPrimary: "#69c920",
      colorPrimaryHover: "#55b51d",
      colorPrimaryActive: "#4aa016",
    },

    DatePicker: {
      colorPrimary: "#69c920",
      controlItemBgActive: "#69c920",
      cellHoverBg: "#e8f8da",
      colorTextPlaceholder: "#163143",
      cellActiveWithRangeBg: "#DBFFDF",
    },

    Tabs: {
      inkBarColor: "transparent", // Underline color (active tab)
      itemSelectedColor: "#163143", // Active tab text color
      itemHoverColor: "#163143", // Hover color
      colorBgContainer: "#86FE964D", // Tab background light green or use #69c920
      colorBorderSecondary: "#BED7DA80", // Border bottom color
    },
    Table: {
      borderRadius: 32, // rounded corners for table and other components
      colorBorder: "#D7E6E7", // custom border color for table
      headerBg: "#EBF3F4",
      rowSelectedBg: "#DBFFDF",
      rowSelectedHoverBg: "#DBFFDF",
      // rowSelectedHoverBg: "#86FE96",
      //   colorBgContainer: "#ffffff", // table background
      //   colorBorderSecondary: "#bfbfbf", // optional: secondary borders (like pagination)
    },
    Select: {
      borderRadius: 32,
      borderColor: "#EFEFEF",
      padding: 30,
      showArrowPaddingInlineEnd: 34,
      // selectorBg: "#FBFBFB",
    },
    Input: {
      borderRadius: 32,
    },
    Modal: {
      borderRadius: 32,
    },
  },
};

export default antdTheme;
