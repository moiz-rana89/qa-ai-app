"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { humanizeKey } from "../../utils/helperFunctions";
import { Icon } from "@iconify/react";
import Skeleton from "../Skeleton";

export default function UnifiedDropdown({
  name,
  className = "",
  data,
  isLoading = false,
  selectedList = [],
  setselectedList,
  multiSelect = false,
  placeholder = "Search",
  displayKey,
  valueKey,
  searchKeys,
  fullwidthDropdown,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const location = useLocation().pathname;

  const isObjectItem = (item) => {
    return typeof item === "object" && item !== null;
  };

  const getDisplayText = (item) => {
    if (isObjectItem(item)) {
      if (displayKey && item[displayKey]) {
        return humanizeKey(String(item[displayKey]));
      }
      return humanizeKey(
        item.label || item.value || item.name || item.title || String(item)
      );
    }
    return humanizeKey(item);
  };

  // const getItemValue = (item) => {
  //   if (isObjectItem(item)) {
  //     if (valueKey && item[valueKey]) {
  //       return String(item[valueKey]);
  //     }
  //     return item.value || item.id || item.key || item.label || String(item);
  //   }
  //   return item;
  // };

  // const getItemValue = (item) => {
  //   if (typeof item === "object" && item !== null) {
  //     return String(item.value ?? item.id ?? item.key ?? item.label ?? item);
  //   }
  //   return String(item ?? "");
  // };

  const getItemValue = (item) => {
    if (typeof item === "object" && item !== null) {
      if (valueKey && item[valueKey] !== undefined) {
        return String(item[valueKey]);
      }

      return String(
        item.value ?? item.id ?? item.key ?? item.label ?? JSON.stringify(item)
      );
    }

    return String(item ?? "");
  };

  const getSearchText = (item) => {
    if (isObjectItem(item)) {
      if (searchKeys && searchKeys.length > 0) {
        const searchTexts = searchKeys
          .map((key) => (item[key] ? humanizeKey(String(item[key])) : ""))
          .filter((text) => text.length > 0)
          .join(" ");
        return searchTexts.toLowerCase();
      }
      if (displayKey && item[displayKey]) {
        return humanizeKey(String(item[displayKey])).toLowerCase();
      }
      return humanizeKey(
        item.label || item.value || item.name || item.title || String(item)
      ).toLowerCase();
    }
    return item.toLowerCase();
  };

  const itemsEqual = (item1, item2) => {
    if (isObjectItem(item1) && isObjectItem(item2)) {
      return getItemValue(item1) === getItemValue(item2);
    }
    return item1 === item2;
  };

  // useEffect(() => {
  //   if (data) {
  //     setOriginalData(data);
  //     setFilteredData(data);
  //   }
  // }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      setOriginalData(data);
      setFilteredData(data);
    }
  }, [isLoading, data]); // only depend on 'data', ignore isLoading

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchQuery("");
        setOpenDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openDropDown) {
      inputRef?.current?.focus();
    }
  }, [openDropDown, selectedList]);

  // useEffect(() => {
  //   const query = searchQuery.toLowerCase();
  //   if (!query) {
  //     setFilteredData(originalData);
  //   } else {
  //     const filtered = originalData.filter((item) =>
  //       getSearchText(item).includes(query)
  //     );
  //     setFilteredData(filtered);
  //   }
  // }, [searchQuery, originalData, displayKey, searchKeys]);

  useEffect(() => {
    if (!Array.isArray(originalData)) return;

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setFilteredData(originalData);
      return;
    }

    setFilteredData(
      originalData.filter((item) => getSearchText(item).includes(query))
    );
  }, [searchQuery, originalData]);

  const handleSelect = (item) => {
    if (multiSelect) {
      const isSelected = selectedList.some((selected) =>
        itemsEqual(selected, item)
      );
      if (isSelected) {
        const newSelection = selectedList.filter(
          (selected) => !itemsEqual(selected, item)
        );
        setselectedList(newSelection);
      } else {
        setselectedList([...selectedList, item]);
      }
    } else {
      const isSelected = selectedList.some((selected) =>
        itemsEqual(selected, item)
      );
      if (isSelected) {
        setselectedList([]);
      } else {
        setselectedList([item]);
        setOpenDropDown(false);
      }
    }
  };

  const handleClearSelection = () => {
    setselectedList([]);
    setSearchQuery("");
  };

  // const handleToggleDropdown = () => {
  //   setOpenDropDown(!openDropDown);
  // };

  const handleToggleDropdown = () => {
    if (isLoading) return;
    setOpenDropDown((prev) => !prev);
  };
  const isItemSelected = (item) => {
    return selectedList?.some((selected) => itemsEqual(selected, item));
  };

  if (isLoading) {
    return (
      <Skeleton
        width="100px"
        className={`${className}`}
        rounded="rounded-full"
      />
    );
  }

  // if (!isLoading && (!data || data.length === 0)) {
  //   return (
  //     <div
  //       className={`border ${className} h-9 rounded-full px-4 flex items-center text-slate-400`}
  //     >
  //       {name}
  //     </div>
  //   );
  // }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={handleToggleDropdown}
        className={`border ${className} h-9 pt-[1px] rounded-full text-sm flex items-center justify-between px-4 cursor-pointer font-poppins`}
      >
        {selectedList.length > 0 ? (
          <div className="mr-1 ml-[5px] h-full flex items-center font-[300] text-center whitespace-nowrap overflow-hidden">
            <span className="truncate max-w-full">
              {multiSelect && selectedList.length > 0 ? (
                <div className="flex">
                  <div className="mr-1 ml-[5px] h-full flex items-center font-[300] text-slate-400 whitespace-nowrap overflow-hidden">
                    <span className="truncate max-w-full text-[#163143] text-[14px]">
                      {name}
                    </span>
                  </div>
                  <div className="bg-[#69C920] text-white font-medium text-[12px] mx-1 rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    {selectedList.length}
                  </div>
                </div>
              ) : (
                getDisplayText(selectedList[0])
              )}
            </span>
          </div>
        ) : (
          <div className="mr-1 ml-[5px] h-full flex items-center font-[300] text-slate-400 whitespace-nowrap overflow-hidden">
            <span className="truncate max-w-full text-[#163143]">{name}</span>
          </div>
        )}

        <Icon
          icon="mingcute:down-line"
          className={`duration-500 ${openDropDown ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {openDropDown && (
        <div
          style={{ width: fullwidthDropdown ? "100%" : "300px" }}
          className="absolute mt-1 flex flex-col rounded-2xl border border-slate-400 bg-white z-30 overflow-hidden"
        >
          <div className="px-2 w-full flex items-center h-[40px] justify-center border-b border-[#BED7DA80]">
            <Icon
              icon="material-symbols:search-rounded"
              color="gray"
              fontSize={20}
            />

            <input
              ref={inputRef}
              value={searchQuery}
              placeholder={placeholder}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex w-full h-[39px] px-2 rounded-t-xl outline-none"
            />

            <Icon
              onClick={() =>
                searchQuery === ""
                  ? setOpenDropDown(false)
                  : [setSearchQuery(""), setFilteredData(originalData)]
              }
              icon="basil:cross-solid"
              color="black"
              fontSize={20}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col max-h-[330px] overflow-y-scroll">
            {filteredData.length === 0 ? (
              <div className="px-4 py-3 text-slate-400 text-center">
                No results found
              </div>
            ) : (
              filteredData.map((item, index) => (
                <div
                  key={`${getDisplayText(item)}-${index}`}
                  onClick={() => handleSelect(item)}
                  className="cursor-pointer px-2 flex hover:bg-slate-200 gap-3 text-[14px] py-3 items-center"
                >
                  <div
                    className={`${
                      isItemSelected(item)
                        ? "bg-[#69C920]"
                        : "border border-slate-400"
                    } rounded w-5 h-5 flex items-center justify-center`}
                  >
                    {isItemSelected(item) && (
                      <Icon icon="ic:round-check" fontSize={17} color="#FFF" />
                    )}
                  </div>

                  <span
                    className="flex-1 truncate"
                    title={getDisplayText(item)}
                  >
                    {getDisplayText(item)}
                  </span>
                </div>
              ))
            )}
          </div>

          {selectedList.length > 0 && (
            <div className="w-full flex items-center justify-center border-t border-[#BED7DA80] min-h-[30px]">
              <div
                className="w-[80%] flex items-center justify-center text-[14px] font-[500] py-2 my-3 rounded-full hover:bg-slate-200 cursor-pointer"
                onClick={handleClearSelection}
              >
                Clear Selection
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
