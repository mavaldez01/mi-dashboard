import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, LineChart, Line, CartesianGrid } from "recharts";

const RAW_DATA = [{"PO #": "P-80310", "PO Date": "2026-02-24", "Vendor": "STAR STAINLESS SCREW CO.", "Item": "PSMBSC042012SSBO", "Description": "1/4-20X3/4 BUTTON SOCKET CAP SCREW STAINLESS BLACK OXIDE (RELEASE 1/2 UPON ARRIVAL, 1/4 3 MONTHS LATER AND FINAL 1/4 3 MONTHS AFTER THAT, ALL PREPAID SHIPPING)", "Ordered": 700000, "Backordered": 700000, "Received": 0, "Open Amt": 29680.0, "ETA": "2026-03-26", "Drop Ship": "No"}, {"PO #": "20172805", "PO Date": "2026-03-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08BZ", "Description": "1/2\" USS FLAT WASHER  BLACK ZINC w/SEALER", "Ordered": 197200, "Backordered": 197200, "Received": 0, "Open Amt": 12104.14, "ETA": "2026-10-02", "Drop Ship": "No"}, {"PO #": "20172812", "PO Date": "2026-03-11", "Vendor": "STELFAST INC", "Item": "PSMCB0616165BZ", "Description": "3/8\"-16x1\",(FT) CARRIAGE BOLTS GRADE 5 .0002 ZINC BLACK WITH SEALER", "Ordered": 60000, "Backordered": 60000, "Received": 0, "Open Amt": 4062.0, "ETA": "2026-04-10", "Drop Ship": "No"}, {"PO #": "20172812", "PO Date": "2026-03-11", "Vendor": "STELFAST INC", "Item": "PSMSFN0616BZ", "Description": "3/8 - 16 SERRATED FLANGE NUT BLACK ZINC", "Ordered": 144000, "Backordered": 144000, "Received": 0, "Open Amt": 4795.2, "ETA": "2026-04-10", "Drop Ship": "No"}, {"PO #": "20172813", "PO Date": "2026-03-11", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB08135RH24BZ", "Description": "1/2-13 X 1-1/2 ROUND HEAD CARRIAGE BOLT GRADE 5 BLACK ZINC w/sealer", "Ordered": 250000, "Backordered": 250000, "Received": 0, "Open Amt": 41387.5, "ETA": "2026-10-02", "Drop Ship": "No"}, {"PO #": "20172861", "PO Date": "2026-05-22", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW07EG", "Description": "7/16\" USS FLAT WASHER ZINC", "Ordered": 3600, "Backordered": 3500, "Received": 100, "Open Amt": 4427.5, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "20172861", "PO Date": "2026-05-22", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW05EG", "Description": "5/16\" USS FLAT WASHER ZINC", "Ordered": 3730, "Backordered": 3680, "Received": 50, "Open Amt": 3815.79, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "P-80265", "PO Date": "2026-06-01", "Vendor": "CLINTON ALUMINUM", "Item": "GI540-1023", "Description": ".125 X .75 X 144\" FLT STOCK 6061-T6511 ALUMINUM", "Ordered": 3000, "Backordered": 3000, "Received": 0, "Open Amt": 19200.0, "ETA": "2026-06-05", "Drop Ship": "No"}, {"PO #": "P-80279", "PO Date": "2026-06-17", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "CS - SB35", "Description": "35\" SHELTER BUMPER, 6\" FACE YELLOW PAINTED STEEL", "Ordered": 200, "Backordered": 200, "Received": 0, "Open Amt": 11600.0, "ETA": "2026-07-17", "Drop Ship": "No"}, {"PO #": "P-80280", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 7675.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 921.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80283", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 25000, "Backordered": 25000, "Received": 0, "Open Amt": 38375.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 7000, "Backordered": 7000, "Received": 0, "Open Amt": 10745.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80285", "PO Date": "2026-06-18", "Vendor": "PHD MFG INC", "Item": "PSM1011AHDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 69480.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80286", "PO Date": "2026-06-18", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Backordered": 12300, "Received": 0, "Open Amt": 46740.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1211PG", "Description": "13/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 2042.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80292", "PO Date": "2026-06-23", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-28", "Drop Ship": "Yes"}, {"PO #": "P-80293", "PO Date": "2026-06-23", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 24600, "Backordered": 24600, "Received": 0, "Open Amt": 93480.0, "ETA": "2026-07-20", "Drop Ship": "Yes"}, {"PO #": "P-80295", "PO Date": "2026-06-23", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMAMLN0813CBZ", "Description": "1/2-13 GRADE C STOVER LOCK NUT BLACK ZINC", "Ordered": 27000, "Backordered": 27000, "Received": 0, "Open Amt": 3077.73, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80297", "PO Date": "2026-06-24", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1012AHDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF  SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 5450.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1012HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF  SLOT CHANNEL 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 9400.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212AHDG", "Description": "13/16 X 1 5/8 X 20' 12 GAGE HALF SLOTTED WELDED BACK TO BACK  CHANNEL HOT DIPPED GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 4010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 740.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1480.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1511PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 300, "Backordered": 300, "Received": 0, "Open Amt": 732.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212HDG", "Description": "13/16 X 1 5/8 12 GAGE  HALF SLOTTED CHANNEL HDG 20' LENGTHS", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 1630.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1011HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2350.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1611PG", "Description": "2-7/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1612PG", "Description": "2-7/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212PG", "Description": "13/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 2040.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1512AHDG", "Description": "1 5/8 X 3 1/4 WELDED BACK TO BACK  12 GAUGE SLOTTED STRUT 20' LENGTHS HDG", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 9190.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1612AHDG", "Description": "1 5/8 X 2 7/16 12 GA WELDED BACK TO BACK SLOTTED HOT DIPPED GALVANIZED 20' LENGTHS", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 15780.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80299", "PO Date": "2026-06-25", "Vendor": "PHD MFG INC", "Item": "PSM1011HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 11000, "Backordered": 11000, "Received": 0, "Open Amt": 28435.0, "ETA": "2026-07-22", "Drop Ship": "Yes"}, {"PO #": "P-80301", "PO Date": "2026-06-25", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "GI510-1013", "Description": "1-7/8\" X 1-7/8\" SLOTTED JAM BRACKET", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 5200.0, "ETA": "2026-07-27", "Drop Ship": "No"}, {"PO #": "P-80303", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 13000, "Backordered": 13000, "Received": 0, "Open Amt": 19955.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80303", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 7675.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 15200.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 12840.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 6420.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH16EG", "Description": "5/16-18X 1\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1400, "Backordered": 1400, "Received": 0, "Open Amt": 50.72, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 265.44, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80306", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80306", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80307", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80307", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80308", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1511PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 200, "Backordered": 200, "Received": 0, "Open Amt": 605.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 10700.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 8000, "Backordered": 8000, "Received": 0, "Open Amt": 8560.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 18420.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1512PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 15125.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 4605.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMAMLN0813CEG", "Description": "1/2\"-13 ALL METAL HEX LOCKNUTS GRADE C MED. CARBON ZINC", "Ordered": 33750, "Backordered": 33750, "Received": 0, "Open Amt": 1847.81, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH16EG", "Description": "5/16-18X 1\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1400, "Backordered": 1400, "Received": 0, "Open Amt": 50.72, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS04205HH16EG", "Description": "1/4-20 X 1 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 6600, "Backordered": 6600, "Received": 0, "Open Amt": 171.86, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08EG", "Description": "1/2\" USS FLAT WASHER ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMMS0420CH06EG", "Description": "1/4-20 X 3/4\" INDENTED HEX COMBINATION HEAD MACHINE SCREW ZINC", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 106.5, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 265.44, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH32ZD", "Description": "1/2-13 X 2 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 11250, "Backordered": 11250, "Received": 0, "Open Amt": 2893.84, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH80EG", "Description": "1/2\"-13x 5\",(PT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW BAKE", "Ordered": 4500, "Backordered": 4500, "Received": 0, "Open Amt": 2846.3, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFW0416EG", "Description": "1/4 X 1 FENDER WASHER ELECTRO-GALV", "Ordered": 6760, "Backordered": 6760, "Received": 0, "Open Amt": 117.89, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS07145HH24EG", "Description": "7/16-14 X 1-1/2 \" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 131.57, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08135HH24EG", "Description": "1/2-13 X 1-1/2 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1500, "Backordered": 1500, "Received": 0, "Open Amt": 213.42, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS07148HH32ZD", "Description": "7/16-14X 2\" HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 400, "Backordered": 400, "Received": 0, "Open Amt": 91.04, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80314", "PO Date": "2026-07-06", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 16000, "Backordered": 16000, "Received": 0, "Open Amt": 24560.0, "ETA": "2026-08-07", "Drop Ship": "Yes"}, {"PO #": "P-80314", "PO Date": "2026-07-06", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-08-07", "Drop Ship": "Yes"}, {"PO #": "P-80314", "PO Date": "2026-07-06", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 9000, "Backordered": 9000, "Received": 0, "Open Amt": 8289.0, "ETA": "2026-08-07", "Drop Ship": "Yes"}, {"PO #": "P-80315", "PO Date": "2026-07-07", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Backordered": 12300, "Received": 0, "Open Amt": 46740.0, "ETA": "2026-08-18", "Drop Ship": "Yes"}, {"PO #": "P-80316", "PO Date": "2026-07-08", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Backordered": 12300, "Received": 0, "Open Amt": 46740.0, "ETA": "2026-08-18", "Drop Ship": "Yes"}, {"PO #": "P-80317", "PO Date": "2026-07-08", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 20500, "Backordered": 20500, "Received": 0, "Open Amt": 31467.5, "ETA": "2026-07-29", "Drop Ship": "Yes"}, {"PO #": "P-80318", "PO Date": "2026-07-08", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Backordered": 12300, "Received": 0, "Open Amt": 46740.0, "ETA": "2026-08-18", "Drop Ship": "Yes"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMHB121072HDG", "Description": "3/4\"-10x4 1/2\",(PT) HEX BOLTS A307 GRADE A COARSE HDG", "Ordered": 80, "Backordered": 80, "Received": 0, "Open Amt": 82.82, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08131122EG", "Description": "1/2\"-13x7\",(PT) GRADE 5 HEX CAP SCREW ZINC", "Ordered": 2340, "Backordered": 2340, "Received": 0, "Open Amt": 1681.99, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMNLN0813EG", "Description": "1/2-13 NYLOCK LOCKNUT ZINC", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 112.64, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSTS141020FHPS", "Description": "#14-10x1 1/4\",(FT) FLAT HEAD PHIL TAPPING SCREWS TYPE A STAINLESS", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 120.46, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMDWS69104BHBP", "Description": "6-9x 1-1/4\"  DRYWALL SCREWS BUGLE HEAD BLACK PHOSPHATE", "Ordered": 8000, "Backordered": 8000, "Received": 0, "Open Amt": 44.8, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSDS0414HWH203EG", "Description": "1/4-14 X 1-1/4\"  HEX WASHER HEAD SELF DRILLING SCREW  #3 POINT ZINC", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 283.62, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH32ZD", "Description": "1/2-13 X 2 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 9000, "Backordered": 9000, "Received": 0, "Open Amt": 2346.21, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 7000, "Backordered": 7000, "Received": 0, "Open Amt": 132.72, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW085EG", "Description": "1/2\" USS FLAT WASHER GRADE 5 ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB0813RH32HDG", "Description": "1/2\"-13x 2\",(FT) CARRIAGE BOLTS A307 GRADE A COARSE HDG", "Ordered": 350, "Backordered": 350, "Received": 0, "Open Amt": 63.12, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB0518RH20HDG", "Description": "5/16-18 X 1-1/4\"  CARRIAGE BOLT HOT-DIP GALVANIZED", "Ordered": 1375, "Backordered": 1375, "Received": 0, "Open Amt": 87.74, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80320", "PO Date": "2026-07-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB051812HDG", "Description": "5/16-18x3/4 CARRIAGE BOLT GRADE A  HDG", "Ordered": 1500, "Backordered": 1500, "Received": 0, "Open Amt": 83.91, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80321", "PO Date": "2026-07-09", "Vendor": "OEG", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 51660.0, "ETA": "2026-08-11", "Drop Ship": "Yes"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS06168HH32ZD", "Description": "3/8-16 X 2\" HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 550, "Backordered": 550, "Received": 0, "Open Amt": 76.89, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH64EG", "Description": "1/2\"-13x 4\",(PT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW", "Ordered": 5400, "Backordered": 5400, "Received": 0, "Open Amt": 2505.06, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS07145HH24EG", "Description": "7/16-14 X 1-1/2 \" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1500, "Backordered": 1500, "Received": 0, "Open Amt": 197.36, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 265.44, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS04205HH24EG", "Description": "1/4-20 X 1-1/2\" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1600, "Backordered": 1600, "Received": 0, "Open Amt": 58.24, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSFNM142EG", "Description": "M14-2.0 NON SERRATED FLANGE NUT ELECTRO-GALV", "Ordered": 500, "Backordered": 500, "Received": 0, "Open Amt": 83.5, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW05EG", "Description": "5/16\" USS FLAT WASHER ZINC", "Ordered": 3730, "Backordered": 3730, "Received": 0, "Open Amt": 51.85, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH24EG", "Description": "5/16-18X 1-1/2\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 53.66, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80322", "PO Date": "2026-07-13", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH16EG", "Description": "5/16-18X 1\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 2800, "Backordered": 2800, "Received": 0, "Open Amt": 111.05, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80325", "PO Date": "2026-07-16", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB08135RH24BZ", "Description": "1/2-13 X 1-1/2 ROUND HEAD CARRIAGE BOLT GRADE 5 BLACK ZINC", "Ordered": 28800, "Backordered": 28800, "Received": 0, "Open Amt": 7919.71, "ETA": "2026-08-07", "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0714EG", "Description": "7/16-14 FINISH HEX NUTS ZINC", "Ordered": 2400, "Backordered": 2400, "Received": 0, "Open Amt": 121.22, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN05185EG", "Description": "5/16 FINISHED HEX NUT GRADE 5 ZINC", "Ordered": 3400, "Backordered": 3400, "Received": 0, "Open Amt": 55.66, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN08135EG", "Description": "1/2-13 FINISHED HEX NUT GRADE 5 ELECTRO-GALV", "Ordered": 40500, "Backordered": 40500, "Received": 0, "Open Amt": 1607.85, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS04205HH16EG", "Description": "1/4-20 X 1 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 2200, "Backordered": 2200, "Received": 0, "Open Amt": 57.29, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08135HH24EG", "Description": "1/2-13 X 1-1/2 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 10800, "Backordered": 10800, "Received": 0, "Open Amt": 1551.31, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08EG", "Description": "1/2\" USS FLAT WASHER ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH32ZD", "Description": "1/2-13 X 2 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 9000, "Backordered": 9000, "Received": 0, "Open Amt": 2346.21, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH36ZD", "Description": "1/2-13 X 2-1/4 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 8100, "Backordered": 8100, "Received": 0, "Open Amt": 2405.38, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS04205HH08EG", "Description": "1/4-20X 1/2\" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 3300, "Backordered": 3300, "Received": 0, "Open Amt": 68.28, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW06EG", "Description": "3/8\" USS FLAT WASHER ZINC", "Ordered": 5800, "Backordered": 5800, "Received": 0, "Open Amt": 95.76, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80326", "PO Date": "2026-07-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW05EG", "Description": "5/16\" USS FLAT WASHER ZINC", "Ordered": 7460, "Backordered": 7460, "Received": 0, "Open Amt": 103.69, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80327", "PO Date": "2026-07-20", "Vendor": "PHD MFG INC", "Item": "PSM1012HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 5490.0, "ETA": "2026-09-08", "Drop Ship": "Yes"}, {"PO #": "P-80327", "PO Date": "2026-07-20", "Vendor": "PHD MFG INC", "Item": "PSM1212AHDG", "Description": "13/16 X 1 5/8 X 20' 12 GAGE SLOTTED CHANNEL HDG", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 4016.29, "ETA": "2026-09-08", "Drop Ship": "Yes"}, {"PO #": "P-80327", "PO Date": "2026-07-20", "Vendor": "PHD MFG INC", "Item": "PSM1212HDG", "Description": "13/16 X 1 5/8 12 GAGE SLOTTED CHANNEL HDG 20' LENGTHS", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2847.0, "ETA": "2026-09-08", "Drop Ship": "Yes"}];

const TODAY = new Date();
const daysDiff = d => Math.floor((TODAY - new Date(d)) / 86400000);
const ageBucket = d => d < 30 ? "< 1 Month" : d < 90 ? "1–3 Months" : d < 180 ? "3–6 Months" : "> 6 Months";
const BUCKETS = ["< 1 Month", "1–3 Months", "3–6 Months", "> 6 Months"];
const BCOLORS = { "< 1 Month": "#4ade80", "1–3 Months": "#60a5fa", "3–6 Months": "#fbbf24", "> 6 Months": "#f87171" };
const fmt$ = v => "$" + v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtK = v => v >= 1000 ? "$" + (v / 1000).toFixed(0) + "K" : "$" + v.toFixed(0);

const lines = RAW_DATA.map(r => ({ ...r, days: daysDiff(r["PO Date"]), bucket: ageBucket(daysDiff(r["PO Date"])) }));

function buildPOs(rows) {
  const map = {};
  rows.forEach(r => {
    const po = r["PO #"];
    if (!map[po]) map[po] = { "PO #": po, "PO Date": r["PO Date"], Vendor: r.Vendor, Ordered: 0, Backordered: 0, Received: 0, "Open Amt": 0, ETA: r.ETA, days: r.days, bucket: r.bucket, "Drop Ship": r["Drop Ship"], lines: [] };
    map[po].Ordered += r.Ordered; map[po].Backordered += r.Backordered;
    map[po].Received += r.Received; map[po]["Open Amt"] += r["Open Amt"];
    map[po].lines.push(r);
    if (r.ETA && (!map[po].ETA || r.ETA > map[po].ETA)) map[po].ETA = r.ETA;
  });
  return Object.values(map);
}

const allPOs = buildPOs(lines);
const allDropShipPOs = allPOs.filter(p => p["Drop Ship"] === "Yes").length;
const vendors = ["All Vendors", ...Array.from(new Set(lines.map(r => r.Vendor))).sort()];

// ── Week-over-week tracking ──
// Previous week's PO list (updated each time a new file is loaded)
const PREV_PO_LIST = ["20172805", "20172812", "20172813", "20172861", "2017858", "P-80265", "P-80267", "P-80272", "P-80278", "P-80279", "P-80280", "P-80282", "P-80283", "P-80284", "P-80285", "P-80286", "P-80288", "P-80292", "P-80293", "P-80295", "P-80297", "P-80299", "P-80301", "P-80303", "P-80304", "P-80305", "P-80306", "P-80307", "P-80308", "P-80309", "P-80310", "P-80311", "P-80312", "P-80313", "P-80314", "P-80315", "P-80316", "P-80317", "P-80318", "P-80319", "P-80320", "P-80321"];
const currentPOSet = new Set(allPOs.map(p => p["PO #"]));
const prevPOSet = new Set(PREV_PO_LIST);
const newPOs = allPOs.filter(p => !prevPOSet.has(p["PO #"])).length;
const closedPOs = PREV_PO_LIST.filter(po => !currentPOSet.has(po)).length;

// Weekly trend history — one entry added each week
const WEEKLY_HISTORY = [
  { week: "Jul 6",  total: 38, newPOs: null, closed: null },
  { week: "Jul 13", total: 42, newPOs: 8,    closed: 7    },
  { week: "Jul 20", total: 41, newPOs: 4,    closed: 5    },
];

// SO weekly trend — updated each week alongside SO data
const SO_WEEKLY_HISTORY = [
  { week: "Jul 6",  total: 79, newSOs: null, closed: null },
  { week: "Jul 13", total: 79, newSOs: 0,    closed: 0    },
  { week: "Jul 20", total: 79, newSOs: 0,    closed: 0    },
];
// SO previous week list for future weekly change tracking
const PREV_SO_LIST = ['201710515','201710640','201710644','201710771','201710827','201710880',
  '201710900','201710904','201710961','201710962','201710979','201710983','201710986','201710993',
  '201711004','201711009','201711010','201711013','201711024','201711032','201711051','201711056',
  '201711057','201711066','201711078','201711080','201711081','201711095','201711096','201711097',
  '201711112','201711113','201711114','201711124','201711126','201711128','20413','20429','20431',
  '20432','20433','20434','20435','20436','20437','20438','20439','20446','20450','20451','20454',
  '20456','20459','20462','20463','20466','20467','20468','20469','20473','20475','20476','20477',
  '20478','20479','20483','20484','20485','20489','20490','20491','20492','20496','20497','20499',
  '20501','20502','20504','20505'];
const currentSOSet = new Set(allSOs.map(s => s["Order #"]));
const prevSOSet = new Set(PREV_SO_LIST);
const newSOsCount = allSOs.filter(s => !prevSOSet.has(s["Order #"])).length;
const closedSOsCount = PREV_SO_LIST.filter(o => !currentSOSet.has(o)).length;
// A PO is "Past Due" if it has at least one line with an ETA in the past
// A PO has "No ETA" if NONE of its lines have an ETA
// A PO is "Partially Received" if it has Received > 0 on at least one line (and is still open)
function classifyPOs(pos) {
  let pastDue = [], noETA = [], onTrack = [], partial = [];
  pos.forEach(p => {
    const etas = p.lines.map(l => l.ETA).filter(Boolean);
    const hasAnyETA = etas.length > 0;
    const minETA = hasAnyETA ? etas.sort()[0] : null;
    const isPastDue = hasAnyETA && minETA < TODAY.toISOString().split('T')[0];
    const isPartial = p.lines.some(l => l.Received > 0);
    if (!hasAnyETA) noETA.push(p);
    else if (isPastDue) pastDue.push(p);
    else onTrack.push(p);
    if (isPartial) partial.push(p);
  });
  return { pastDue, noETA, onTrack, partial };
}
const insightsAll = classifyPOs(allPOs);

// Partially received LINE items (more granular — e.g. "only 125 pcs left")
const partialLines = lines.filter(l => l.Received > 0 && l.Backordered > 0)
  .map(l => ({ ...l, pctReceived: l.Received / l.Ordered }))
  .sort((a, b) => a.Backordered - b.Backordered);

// Top overdue POs by days late
const overdueDetail = allPOs.filter(p => insightsAll.pastDue.includes(p))
  .map(p => {
    const etas = p.lines.map(l => l.ETA).filter(Boolean).sort();
    const minETA = etas[0];
    const daysLate = Math.floor((TODAY - new Date(minETA)) / 86400000);
    return { ...p, minETA, daysLate };
  }).sort((a, b) => b.daysLate - a.daysLate);

// ── SALES ORDER DATA ──
const SO_DATA = [{"Order #": "201710515", "Order Date": "2022-02-23", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "CS-SB39", "Description": "630-1039 39\" SHELTER BUMPER. 6\" FACE PAINTED STEEL. BLANKET ORDER TO BE RELEASED AS NEEDED.  1ST RELEASE 3 PCS 3-4-22", "Ordered": 10, "Shipped": 3, "Backordered": 7, "Open Amt": 1372.0, "Due Date": "2026-12-01", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710640", "Order Date": "2023-07-31", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1019", "Description": "510-1019 FLAT MOUNTING BRACKET FOR DOCK SEALS. BLANKET ORDER 4 RELEASES OF 500 EACH.  1ST RELEASE 500 PCS 4-03-25", "Ordered": 2000, "Shipped": 1000, "Backordered": 1000, "Open Amt": 2870.0, "Due Date": "2026-12-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710644", "Order Date": "2023-08-16", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "PSMSDS041420HWH3ZP", "Description": "560-1113    1/4-14 x 7/8 HWH 3/8 A/F # 3 SELF DRILLING SCREW ZP.  Replacements for wrong parts shipped on 6-30-23 and billed on invoice 18964. Original invoice has been paid so this is just a packing slip and parts are at no additional cost", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 0.0, "Due Date": "2026-12-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710771", "Order Date": "2024-05-30", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "CS-SB27", "Description": "630-1027    27\" SHELTER BUMPER, 6\" FACE PAINTED STEEL. BLANKET ORDER TO BE RELEASED AS REQUIRED.  Balance remaining on this blanket order is 17 PCS", "Ordered": 30, "Shipped": 15, "Backordered": 15, "Open Amt": 2505.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710827", "Order Date": "2024-09-30", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS31HC10C", "Description": "10-24 HIGH CROWN CAP ACORN NUT 18-8 STAINLESS DUE DATE 7/08/25", "Ordered": 5000, "Shipped": 4841, "Backordered": 159, "Open Amt": 103.35, "Due Date": "2025-07-08", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201710880", "Order Date": "2025-01-17", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1044", "Description": "560-1044    LASER CUT GALVANIZED STEEL BOTTOM BRACKET WITH BENT BOLT AND SERRATED FLANGE NUT FOR CANE BOLT\u2026 BLANKET ORDER WITH RELEASES AS NEEDED.  1ST RELEASE 100 PCS EACH 11-26-25", "Ordered": 1000, "Shipped": 100, "Backordered": 900, "Open Amt": 10548.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710880", "Order Date": "2025-01-17", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1043", "Description": "560-1043    LASER CUT GALVANIZED STEEL TOP BRACKET WITH BENT BOLT AND SERRATED FLANGE NUT FOR CANE BOLT", "Ordered": 1000, "Shipped": 100, "Backordered": 900, "Open Amt": 10836.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710880", "Order Date": "2025-01-17", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1042", "Description": "560-1042    5/8\" X 28\" CANE BOLT HOT DIP GALVANIZED", "Ordered": 1000, "Shipped": 100, "Backordered": 900, "Open Amt": 14184.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710900", "Order Date": "2025-03-06", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1024", "Description": "510-1024    4\" SPLICE PLATE\u2026 BLANKET ORDER WITH 4 RELEASES AS NEEDED OF 500 PCS EACH.  1ST RELEASE 500 PCS 7/23/25  2ND RELEASE - 500 PCS 10/17/25  3RD RELEASE - 500 PCS 5/04/26", "Ordered": 2000, "Shipped": 1500, "Backordered": 500, "Open Amt": 1490.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710904", "Order Date": "2025-03-12", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1121", "Description": "560-1121    10\" TRACK REINFORCEMENT BRACKET PRE GALV FINISH.  QUOTING A BLANKET ORDER WITH 2 RELEASES OF 15 PCS AS REQUIRED", "Ordered": 30, "Shipped": 0, "Backordered": 30, "Open Amt": 645.6, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710986", "Order Date": "2025-04-08", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS31HC10C", "Description": "11000115589 10-24 HIGH CROWN CAP ACORN NUT 18-8 STAINLESS (BLANKET ORDER QUOTE WITH 4 RELEASES OF 5000 PER ESCHEDULE BELOW) - 3RD RELEASE  6-1-26 4TH RELEASE  9-5-26", "Ordered": 20000, "Shipped": 15000, "Backordered": 5000, "Open Amt": 3475.0, "Due Date": "2026-06-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711004", "Order Date": "2025-05-09", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1005-ARU", "Description": "510-1005-ARU2  UNIVERSAL AUTOMATIC TUBE MOTOR MOUNTING PLATE, BLANKET ORDER WITH 4 RELEASES OF 100 EACH AS NEEDED, 1ST RELEASE 100 PCS 3/24/2026", "Ordered": 400, "Shipped": 200, "Backordered": 200, "Open Amt": 4800.0, "Due Date": "2026-08-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711032", "Order Date": "2025-05-11", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "PSMA200093156", "Description": "560-1096     1\" X 5' 6 \" SOLID KEYED SHAFT  280\u00b4= 250 PCS     BLANKET ORDER WITH 4 RELEASES OF 280\u00b4 / 50 PCS EACH AS NEEDED", "Ordered": 200, "Shipped": 50, "Backordered": 150, "Open Amt": 13255.5, "Due Date": "2026-12-01", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711051", "Order Date": "2025-05-12", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS19134", "Description": "19134 3/8-16 X 1 HEX HEAD CAP SCREW 18-8 STAINLESS DUE DATE 9-1-26", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 140.0, "Due Date": "2026-09-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201710961", "Order Date": "2025-06-13", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1005-MRU", "Description": "MOUNTING PLATE, SPRING DRIVE  -  BLANKET ORDER WITH 3 RELEASES OF 250 PCS AS NEEDED", "Ordered": 750, "Shipped": 500, "Backordered": 250, "Open Amt": 4280.0, "Due Date": "2026-12-04", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710962", "Order Date": "2025-06-13", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "PSMMR025LFH6275EG", "Description": "560-1024    MATE RIVET 1/4\" WITH 0.625 - 0.750 GRIP RANGE LARGE FLANGE HEAD ELECTRO-GALV. BLANKET ORDER WITH 4 RELEASES OF 2000 PCS AS NEEDED.  1ST RELEASE 2000 PCS 11-14-25  2ND RELEASE 2000 PCS 3-24-26", "Ordered": 8000, "Shipped": 6000, "Backordered": 2000, "Open Amt": 1160.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710979", "Order Date": "2025-07-23", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1028", "Description": "510-1028    90 DEGREE SLOTTED BRACKET   WITH 5/16-18 X 5/8 WELDED STUD.  BLANKET ORDER WITH 3 RELEASES OF 1000 PCS EACH AS NEEDED  1ST RELEASE 1000 PCS 4/27/26", "Ordered": 3000, "Shipped": 1000, "Backordered": 2000, "Open Amt": 19920.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710983", "Order Date": "2025-07-30", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1020", "Description": "510-1020     17\" SPLICE PLATE..  BLANKET ORDER 4 TENTATIVE RELEASES OF 125 EACH AS NEEDED.  1ST RELEASE 125 PCS 11-03-25  2ND RELEASE 125 PCS 2-2-26", "Ordered": 500, "Shipped": 375, "Backordered": 125, "Open Amt": 1122.5, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201710993", "Order Date": "2025-08-14", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "CS-SB33", "Description": "33\" SHELTER BUMPER 6\" FACE PAINTED STEEL.  BLANKET PURCHASE ORDER TO BE RELEASED AS NEEDED", "Ordered": 10, "Shipped": 0, "Backordered": 10, "Open Amt": 1930.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711009", "Order Date": "2025-09-16", "Customer": "DEPENDABLE STAMPING", "Item": "ZDSFA30002", "Description": "FA30002 FLAT WASHER 1/4  17/64 -ID x 1/2-OD SS DUE DATE 8-15-26", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 240.0, "Due Date": "2026-09-15", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711010", "Order Date": "2025-09-17", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "PSM25R1200RKS0Z", "Description": "560-1097   1/4 X 12\" KEYWAY STOCK Z/P", "Ordered": 100, "Shipped": 97, "Backordered": 3, "Open Amt": 8.04, "Due Date": "2026-12-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711013", "Order Date": "2025-09-19", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI530-1005", "Description": "530-1005   ALUMINUM CROWN DIVE HIGH CYCLE REV D.  BLANKET PO 4 RELEASES OF 250 PCS AS NEEDED  1ST RELEASE 250 PCS. 5/04/26", "Ordered": 1000, "Shipped": 250, "Backordered": 750, "Open Amt": 18705.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711024", "Order Date": "2025-10-13", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1010", "Description": "510-1010    9\" SPLICE PLATE BLANKET ORDER 4 RELEASES 250 PCS EACH", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 5680.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711057", "Order Date": "2025-11-10", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "PSMA200093221", "Description": "1-1/4\" X 36\"  SOLID KEYED SHAFT.. BLANKET ORDER WITH RELEASES AS NEEDED.  1ST RELEASE 8 PCS DELIVERED 4/10/2026", "Ordered": 32, "Shipped": 8, "Backordered": 24, "Open Amt": 1579.68, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711056", "Order Date": "2025-11-24", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1107", "Description": "560-1107    1/4\" WALL MOUNT PLATES PAIRED ONE LEFT AND ONE RIGHT PLAIN FINISH.  BLANKET WITH 2 RELEASES AS REQUIRED OF 15 PAIRED SETS", "Ordered": 30, "Shipped": 0, "Backordered": 30, "Open Amt": 1134.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711066", "Order Date": "2026-01-28", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS02573", "Description": "02573 BUSHING HEX 1 1/2 X 1 BLACK", "Ordered": 150, "Shipped": 0, "Backordered": 150, "Open Amt": 430.5, "Due Date": "2026-10-10", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711078", "Order Date": "2026-02-27", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI560-1120", "Description": "560-1120    6\" TRACK REINFORCEMENT BRACKET PRE GALV FINISH.  BLANKET ORDER WITH 4 RELEASES OF 100 PCS AS REQUIRED", "Ordered": 400, "Shipped": 100, "Backordered": 300, "Open Amt": 3474.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711080", "Order Date": "2026-03-03", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS1H50C75", "Description": "1/2-13 X 3/4\" HEX HEAD CAP SCREW 18-8 STAINLESS STEEL- DUE 11/2/26", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 280.0, "Due Date": "2026-11-02", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711080", "Order Date": "2026-03-03", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS1H50C75", "Description": "1/2-13 X 3/4\" HEX HEAD CAP SCREW 18-8 STAINLESS STEEL- DUE 2/1/27", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 280.0, "Due Date": "2027-02-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711080", "Order Date": "2026-03-03", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS1H50C75", "Description": "1/2-13 X 3/4\" HEX HEAD CAP SCREW 18-8 STAINLESS STEEL- DUE 8/1/26", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 280.0, "Due Date": "2026-08-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711081", "Order Date": "2026-03-03", "Customer": "DEPENDABLE STAMPING", "Item": "ZDSC110985", "Description": "HOSE FITTING COMBINATION HOSE NIPPLE 1 1/2\" MALE NPT X HOSE BARB FOR 1 1/2: ID ZINC PLATED  - DUE 2/1/26", "Ordered": 200, "Shipped": 0, "Backordered": 200, "Open Amt": 1138.0, "Due Date": "2026-05-29", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711095", "Order Date": "2026-03-19", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI520-1035", "Description": "520-1035  E-TRACK BRACKET 2\" X 8.25\" FLAT MOUNT.  BLANKET ORDER WITH 2 RELEASES OF 250 PCS AS NEEDED.", "Ordered": 500, "Shipped": 0, "Backordered": 500, "Open Amt": 4470.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711096", "Order Date": "2026-03-26", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS14202`4HHCSS1", "Description": "1/4-20 X 2 1/4\" HEX HEAD CAP SCREW 3/4\" THREAD LENGTH 18-8 STAINLESS - DUE - 3/1/27", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 230.0, "Due Date": "2027-03-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711096", "Order Date": "2026-03-26", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS14202`4HHCSS1", "Description": "1/4-20 X 2 1/4\" HEX HEAD CAP SCREW 3/4\" THREAD LENGTH 18-8 STAINLESS - DUE - 5/1/27", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 230.0, "Due Date": "2027-05-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711096", "Order Date": "2026-03-26", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS14202`4HHCSS1", "Description": "1/4-20 X 2 1/4\" HEX HEAD CAP SCREW 3/4\" THREAD LENGTH 18-8 STAINLESS - DUE 12/1/26", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 230.0, "Due Date": "2026-12-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711096", "Order Date": "2026-03-26", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS14202`4HHCSS1", "Description": "1/4-20 X 2 1/4\" HEX HEAD CAP SCREW 3/4\" THREAD LENGTH 18-8 STAINLESS - DUE 9/1/26", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 230.0, "Due Date": "2026-09-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711097", "Order Date": "2026-03-26", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1005-IDLER", "Description": "MOUNTING PLATE-IDLER..  BLANKET ORDER 3 RELEASES OF 500 PCS. EA.", "Ordered": 1500, "Shipped": 500, "Backordered": 1000, "Open Amt": 13260.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711113", "Order Date": "2026-04-02", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1021R", "Description": "510-1021R     2\" X 2\" X 16\" GALVANIZED ANGLE BRACKET RIGHT, W PUNCHED/MOUNTING HOLES..  BLANKET ORDER 4 RELEASES 250 PCS EACH", "Ordered": 1000, "Shipped": 250, "Backordered": 750, "Open Amt": 9720.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711113", "Order Date": "2026-04-02", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1021L", "Description": "510-1021L     2\" X 2\" X 16\" GALVANIZED ANGLE BRACKET LEFT, W PUNCHED/MOUNTING HOLES", "Ordered": 1000, "Shipped": 250, "Backordered": 750, "Open Amt": 9720.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711114", "Order Date": "2026-04-02", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1014", "Description": "510-1014    CHAIN HOIST BRACKET (10 GA. GALVANIZED)", "Ordered": 400, "Shipped": 100, "Backordered": 300, "Open Amt": 2226.0, "Due Date": "2026-12-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711112", "Order Date": "2026-04-20", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1013", "Description": "510-1013    1-7/8\" X 1-7/8\" SLOTTED JAM BRACKET.  BLANKET ORDER 4 TENTATIVE RELEASES OF 1000 PCS  EACH AS NEEDED. ", "Ordered": 4000, "Shipped": 0, "Backordered": 4000, "Open Amt": 11880.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711124", "Order Date": "2026-04-24", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1012", "Description": "5510-1012    -1/4 X 1-3/4 SPLICE JAMB BRACKET PRE-GALV.. BLANKET ORDER 4  RELEASES OF 600 PCS  EACH AS NEEDED. ", "Ordered": 2400, "Shipped": 0, "Backordered": 2400, "Open Amt": 3528.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711126", "Order Date": "2026-05-15", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI540-1023", "Description": "540-1023    .125 X 75 X 144\" FLT STOCK 6061-T6511 ALUMINUM.  BLANKET ORDER 6  RELEASES OF 600 PCS  EACH AS NEEDED. ", "Ordered": 3600, "Shipped": 0, "Backordered": 3600, "Open Amt": 27324.0, "Due Date": "2026-05-31", "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "201711128", "Order Date": "2026-05-19", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS202221", "Description": "202221 1 1/2\" TEE BLACK IRON - 2-1-27", "Ordered": 100, "Shipped": 0, "Backordered": 100, "Open Amt": 488.0, "Due Date": "2027-02-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "201711128", "Order Date": "2026-05-19", "Customer": "DEPENDABLE STAMPING", "Item": "ZDS202221", "Description": "202221 1 1/2\" TEE BLACK IRON - 10-1-26", "Ordered": 100, "Shipped": 0, "Backordered": 100, "Open Amt": 488.0, "Due Date": "2026-10-01", "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20413", "Order Date": "2026-06-10", "Customer": "HEYDEN SUPPLY DULUTH", "Item": "PSM1012HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 5000, "Shipped": 3000, "Backordered": 2000, "Open Amt": 6720.0, "Due Date": "2026-06-10", "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20413", "Order Date": "2026-06-10", "Customer": "HEYDEN SUPPLY DULUTH", "Item": "PSM1212HDG", "Description": "13/16 1 5/8 12 GAGE HALF SLOT CHANNEL HDG 20' LENGTHS", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 2340.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20413", "Order Date": "2026-06-10", "Customer": "HEYDEN SUPPLY DULUTH", "Item": "PSM1212AHDG", "Description": "13/16 X 1 5/8 12 GAGE HALF SLOT  WELDED BACK TO BACK  CHANNEL HDG 20' LENGTHS", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 5730.0, "Due Date": "2026-06-10", "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20429", "Order Date": "2026-06-17", "Customer": "CHALFANT SEWING FABRICATORS", "Item": "CS - SB35", "Description": "35\" SHELTER BUMPER, 6\" FACE PAINTED STEEL", "Ordered": 200, "Shipped": 0, "Backordered": 200, "Open Amt": 13900.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20431", "Order Date": "2026-06-17", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Shipped": 0, "Backordered": 12000, "Open Amt": 49080.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20432", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 7450.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20432", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 1030.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20432", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20433", "Order Date": "2026-06-17", "Customer": "WHITECAPATLANTA  560", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 12500, "Shipped": 0, "Backordered": 12500, "Open Amt": 18625.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20434", "Order Date": "2026-06-17", "Customer": "WHITECAPATLANTA  560", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 12500, "Shipped": 0, "Backordered": 12500, "Open Amt": 18625.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20435", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20436", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 2060.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20436", "Order Date": "2026-06-17", "Customer": "WHITECAP 105 IOWA CITY", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 7000, "Shipped": 0, "Backordered": 7000, "Open Amt": 10430.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20437", "Order Date": "2026-06-18", "Customer": "WHITECAP 588 WASHINGTON DC", "Item": "PSM1011AHDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 12000, "Shipped": 0, "Backordered": 12000, "Open Amt": 78480.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20438", "Order Date": "2026-06-18", "Customer": "WHITECAP 588 WASHINGTON DC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 23400.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20439", "Order Date": "2026-06-18", "Customer": "WHITECAP 588 WASHINGTON DC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6300, "Shipped": 0, "Backordered": 6300, "Open Amt": 24570.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20446", "Order Date": "2026-06-19", "Customer": "WHITE CAP 675 WATERLOO", "Item": "PSM1211PG", "Description": "13/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 3100.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20446", "Order Date": "2026-06-19", "Customer": "WHITE CAP 675 WATERLOO", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 10000, "Shipped": 0, "Backordered": 10000, "Open Amt": 14900.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20446", "Order Date": "2026-06-19", "Customer": "WHITE CAP 675 WATERLOO", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Shipped": 0, "Backordered": 10000, "Open Amt": 14900.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20450", "Order Date": "2026-06-22", "Customer": "WHITE CAP 579 MEMPHIS", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20451", "Order Date": "2026-06-22", "Customer": "WHITE CAP 579 MEMPHIS", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20454", "Order Date": "2026-06-23", "Customer": "WHITE CAP 211 BALTIMORE", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 24600, "Shipped": 0, "Backordered": 24600, "Open Amt": 95940.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20456", "Order Date": "2026-06-24", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1018", "Description": "ANGLE MOUNTING BRACKET FOR DOCK SEALS", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 2980.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "20459", "Order Date": "2026-06-24", "Customer": "WHITECAPCHICAGO 562", "Item": "PSM1011HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 11000, "Shipped": 0, "Backordered": 11000, "Open Amt": 32780.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20462", "Order Date": "2026-06-24", "Customer": "WHITECAPATLANTA  560", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20463", "Order Date": "2026-06-24", "Customer": "WHITECAPATLANTA  560", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20466", "Order Date": "2026-06-26", "Customer": "WHITECAPNASHVILLE-580", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 7450.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20466", "Order Date": "2026-06-26", "Customer": "WHITECAPNASHVILLE-580", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Shipped": 0, "Backordered": 12000, "Open Amt": 16680.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20467", "Order Date": "2026-06-26", "Customer": "WHITECAPNASHVILLE-580", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 4000, "Shipped": 0, "Backordered": 4000, "Open Amt": 16360.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20467", "Order Date": "2026-06-26", "Customer": "WHITECAPNASHVILLE-580", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 8340.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20469", "Order Date": "2026-06-26", "Customer": "WHITECAP DALLAS 582", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20473", "Order Date": "2026-06-26", "Customer": "R F PRODUCTS", "Item": "PSMATR081310EG", "Description": "1/2-13 X 10' ALL THREAD ROD ZINC", "Ordered": 2160, "Shipped": 0, "Backordered": 2160, "Open Amt": 1706.4, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20475", "Order Date": "2026-07-01", "Customer": "WHITE CAP FO3 MT. JULIET TN CDH", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20475", "Order Date": "2026-07-01", "Customer": "WHITE CAP FO3 MT. JULIET TN CDH", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20476", "Order Date": "2026-07-01", "Customer": "WHITE CAP 573", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Shipped": 0, "Backordered": 10000, "Open Amt": 14900.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20476", "Order Date": "2026-07-01", "Customer": "WHITE CAP 573", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 24540.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20477", "Order Date": "2026-07-01", "Customer": "WHITECAPCHICAGO 562", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Shipped": 0, "Backordered": 12000, "Open Amt": 49080.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20478", "Order Date": "2026-07-02", "Customer": "WHITECAPSAVANNAH 561", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 2100.0, "Due Date": "2026-07-02", "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20478", "Order Date": "2026-07-02", "Customer": "WHITECAPSAVANNAH 561", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 2100.0, "Due Date": "2026-07-02", "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20478", "Order Date": "2026-07-02", "Customer": "WHITECAPSAVANNAH 561", "Item": "PSM1511PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 200, "Shipped": 0, "Backordered": 200, "Open Amt": 824.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20478", "Order Date": "2026-07-02", "Customer": "WHITECAPSAVANNAH 561", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Shipped": 0, "Backordered": 10000, "Open Amt": 14100.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20478", "Order Date": "2026-07-02", "Customer": "WHITECAPSAVANNAH 561", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 8000, "Shipped": 0, "Backordered": 8000, "Open Amt": 11920.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20479", "Order Date": "2026-07-02", "Customer": "WHITECAPCHICAGO 562", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Shipped": 0, "Backordered": 12000, "Open Amt": 17880.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20479", "Order Date": "2026-07-02", "Customer": "WHITECAPCHICAGO 562", "Item": "PSM1512PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 20600.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20479", "Order Date": "2026-07-02", "Customer": "WHITECAPCHICAGO 562", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Shipped": 0, "Backordered": 5000, "Open Amt": 5250.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20468", "Order Date": "2026-07-06", "Customer": "WHITECAP DALLAS 582", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 13000, "Shipped": 0, "Backordered": 13000, "Open Amt": 19370.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20483", "Order Date": "2026-07-06", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 16000, "Shipped": 0, "Backordered": 16000, "Open Amt": 23840.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20484", "Order Date": "2026-07-06", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 10000, "Shipped": 0, "Backordered": 10000, "Open Amt": 14900.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20484", "Order Date": "2026-07-06", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 9000, "Shipped": 0, "Backordered": 9000, "Open Amt": 9450.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20485", "Order Date": "2026-07-07", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Shipped": 0, "Backordered": 12300, "Open Amt": 50307.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20490", "Order Date": "2026-07-07", "Customer": "WHITECAP 585 AUSTIN", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Shipped": 0, "Backordered": 12300, "Open Amt": 50307.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20491", "Order Date": "2026-07-07", "Customer": "WHITECAPCOLUMBIA SC 577", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Shipped": 0, "Backordered": 12300, "Open Amt": 50307.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20492", "Order Date": "2026-07-07", "Customer": "WHITE CAP 274 CANTON OHIO", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 20500, "Shipped": 0, "Backordered": 20500, "Open Amt": 30545.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20489", "Order Date": "2026-07-07", "Customer": "TNT Solutions", "Item": "PSMFHN0613HDG", "Description": "3/8\"-16 HEX NUTS COARSE LOW CARBON HDG", "Ordered": 4000, "Shipped": 0, "Backordered": 4000, "Open Amt": 120.0, "Due Date": "2026-07-07", "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20489", "Order Date": "2026-07-07", "Customer": "TNT Solutions", "Item": "PSMCB0616RH48HDG", "Description": "3/8\"-16x 3\" CARRIAGE BOLTS GRADE A COARSE HOT-DIP GALVANIZED", "Ordered": 1000, "Shipped": 0, "Backordered": 1000, "Open Amt": 175.0, "Due Date": "2026-07-07", "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20489", "Order Date": "2026-07-07", "Customer": "TNT Solutions", "Item": "PSMCB0616RH32HDG", "Description": "3/8\"-16x 2\",(FT) CARRIAGE BOLTS A307 GRADE A COARSE HDG", "Ordered": 3000, "Shipped": 0, "Backordered": 3000, "Open Amt": 360.0, "Due Date": "2026-07-07", "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20496", "Order Date": "2026-07-09", "Customer": "WHITE CAP 573", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 14000, "Shipped": 0, "Backordered": 14000, "Open Amt": 57260.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "N/A"}, {"Order #": "20497", "Order Date": "2026-07-09", "Customer": "DEPENDABLE STAMPING", "Item": "ZDSFA21501-2", "Description": "1/4-20 ACORN NUT THREAD 5/16\" DEPTH 7/16 WIDTH 18-8 STAINLESS STEEL - DUE 2/8/2027", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 1460.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20497", "Order Date": "2026-07-09", "Customer": "DEPENDABLE STAMPING", "Item": "ZDSFA21501-2", "Description": "1/4-20 ACORN NUT THREAD 5/16\" DEPTH 7/16 WIDTH 18-8 STAINLESS STEEL - DUE 10/5/2026", "Ordered": 2000, "Shipped": 0, "Backordered": 2000, "Open Amt": 1460.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20499", "Order Date": "2026-07-10", "Customer": "HEYDEN SUPPLY DULUTH", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Shipped": 0, "Backordered": 6000, "Open Amt": 29340.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "DIST"}, {"Order #": "20501", "Order Date": "2026-07-13", "Customer": "GATEWAY INDUSTRIAL PRODUCTS INC", "Item": "GI510-1009", "Description": "7\" SPLICE PLATE EG", "Ordered": 1500, "Shipped": 0, "Backordered": 1500, "Open Amt": 5940.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "OHD"}, {"Order #": "20502", "Order Date": "2026-07-14", "Customer": "CHALFANT SEWING FABRICATORS", "Item": "PSMLS05HWH26EG", "Description": "5/16 X 1-5/8\"  HEX WASHER HEAD LAG SCREW 7/16 A/F ZINC", "Ordered": 20000, "Shipped": 0, "Backordered": 20000, "Open Amt": 2764.0, "Due Date": null, "Sales Rep": "N/A", "Customer Type": "MFG"}, {"Order #": "20504", "Order Date": "2026-07-14", "Customer": "RANCH HAND", "Item": "PSMAMLN0813CBZ", "Description": "1/2-13 GRADE C STOVER LOCK NUT BLACK ZINC BN-143", "Ordered": 3000, "Shipped": 0, "Backordered": 3000, "Open Amt": 780.0, "Due Date": null, "Sales Rep": "TNT Solutions ", "Customer Type": "MFG"}, {"Order #": "20505", "Order Date": "2026-07-16", "Customer": "RANCH HAND", "Item": "PSMCS04205HH24EG", "Description": "1/4-20 X 1-1/2\" HEX HEAD CAP SCREW GRADE 5 ZINC BO-123", "Ordered": 1600, "Shipped": 0, "Backordered": 1600, "Open Amt": 80.0, "Due Date": null, "Sales Rep": "TNT Solutions ", "Customer Type": "MFG"}];

const soLines = SO_DATA.map(r => ({ ...r, days: daysDiff(r["Order Date"]), bucket: ageBucket(daysDiff(r["Order Date"])) }));

function buildSOs(rows) {
  const map = {};
  rows.forEach(r => {
    const id = r["Order #"];
    if (!map[id]) map[id] = { "Order #": id, "Order Date": r["Order Date"], Customer: r.Customer, "Customer Type": r["Customer Type"], Ordered: 0, Shipped: 0, Backordered: 0, "Open Amt": 0, "Due Date": r["Due Date"], days: r.days, bucket: r.bucket, lines: [] };
    map[id].Ordered += r.Ordered;
    map[id].Shipped += r.Shipped;
    map[id].Backordered += r.Backordered;
    map[id]["Open Amt"] += r["Open Amt"];
    map[id].lines.push(r);
    if (r["Due Date"] && (!map[id]["Due Date"] || r["Due Date"] < map[id]["Due Date"])) map[id]["Due Date"] = r["Due Date"];
  });
  return Object.values(map);
}

const allSOs = buildSOs(soLines);
const soCustomers = ["All Customers", ...Array.from(new Set(soLines.map(r => r.Customer))).sort()];

function classifySOs(sos) {
  let pastDue = [], noDate = [], onTrack = [], partial = [];
  const todayStr = TODAY.toISOString().split('T')[0];
  sos.forEach(s => {
    const dates = s.lines.map(l => l["Due Date"]).filter(Boolean);
    const hasDate = dates.length > 0;
    const minDate = hasDate ? dates.sort()[0] : null;
    const isPastDue = hasDate && minDate < todayStr;
    const isPartial = s.lines.some(l => l.Shipped > 0);
    if (!hasDate) noDate.push(s);
    else if (isPastDue) pastDue.push(s);
    else onTrack.push(s);
    if (isPartial) partial.push(s);
  });
  return { pastDue, noDate, onTrack, partial };
}
const soInsights = classifySOs(allSOs);


const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("po"); // "po" | "so"
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  // SO states
  const [soBucket, setSoBucket] = useState(null);
  const [soCustomer, setSoCustomer] = useState("All Customers");
  const [soSearch, setSoSearch] = useState("");
  const [soSortCol, setSoSortCol] = useState("days");
  const [soSortDir, setSoSortDir] = useState("desc");
  const [soDetailView, setSoDetailView] = useState("sos");
  const [soExpandedRow, setSoExpandedRow] = useState(null);
  const [searchPO, setSearchPO] = useState("");
  const [sortCol, setSortCol] = useState("days");
  const [sortDir, setSortDir] = useState("desc");
  const [expandedPO, setExpandedPO] = useState(null);
  const [detailView, setDetailView] = useState("pos");
  const [insightFilter, setInsightFilter] = useState(null); // "pastDue" | "noETA" | "partial" | null

  const insightPOSets = useMemo(() => ({
    pastDue: new Set(insightsAll.pastDue.map(p => p["PO #"])),
    noETA: new Set(insightsAll.noETA.map(p => p["PO #"])),
    partial: new Set(insightsAll.partial.map(p => p["PO #"])),
  }), []);

  const filteredLines = useMemo(() => lines.filter(r => {
    if (selectedBucket && r.bucket !== selectedBucket) return false;
    if (selectedVendor !== "All Vendors" && r.Vendor !== selectedVendor) return false;
    if (searchPO && !r["PO #"].toLowerCase().includes(searchPO.toLowerCase())) return false;
    if (insightFilter && !insightPOSets[insightFilter].has(r["PO #"])) return false;
    return true;
  }), [selectedBucket, selectedVendor, searchPO, insightFilter, insightPOSets]);

  const filteredPOs = useMemo(() => buildPOs(filteredLines), [filteredLines]);

  // SO filtered data
  const filteredSOLines = useMemo(() => soLines.filter(r => {
    if (soBucket && r.bucket !== soBucket) return false;
    if (soCustomer !== "All Customers" && r.Customer !== soCustomer) return false;
    if (soSearch && !r["Order #"].toLowerCase().includes(soSearch.toLowerCase())) return false;
    return true;
  }), [soBucket, soCustomer, soSearch]);

  const filteredSOs = useMemo(() => buildSOs(filteredSOLines), [filteredSOLines]);

  const soAgingSummary = useMemo(() => {
    const map = {}; BUCKETS.forEach(b => map[b] = { sos: 0, openAmt: 0 });
    allSOs.forEach(s => { map[s.bucket].sos++; map[s.bucket].openAmt += s["Open Amt"]; });
    return BUCKETS.map(b => ({ bucket: b, name: b, value: map[b].sos, openAmt: map[b].openAmt })).filter(d => d.value > 0);
  }, []);

  const customerBar = useMemo(() => {
    const map = {};
    filteredSOLines.forEach(r => {
      if (!map[r.Customer]) map[r.Customer] = { customer: r.Customer.split(" ").slice(0, 2).join(" "), full: r.Customer, openAmt: 0 };
      map[r.Customer].openAmt += r["Open Amt"];
    });
    return Object.values(map).sort((a, b) => b.openAmt - a.openAmt).slice(0, 6);
  }, [filteredSOLines]);

  const soSorted = useMemo(() => {
    const data = soDetailView === "sos" ? filteredSOs : filteredSOLines;
    return [...data].sort((a, b) => {
      let av = a[soSortCol] ?? "", bv = b[soSortCol] ?? "";
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return soSortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }, [filteredSOs, filteredSOLines, soDetailView, soSortCol, soSortDir]);

  function toggleSoSort(col) {
    if (soSortCol === col) setSoSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSoSortCol(col); setSoSortDir("asc"); }
  }

  const SOTh = ({ col, label, right }) => (
    <th onClick={() => toggleSoSort(col)} style={{ padding: "10px 12px", textAlign: right ? "right" : "left", color: soSortCol === col ? "#93c5fd" : TH, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none", background: "#060c18", borderBottom: "1px solid #1e3a5f" }}>
      {label}{soSortCol === col ? (soSortDir === "asc" ? " ↑" : " ↓") : ""}
    </th>
  );

  // Aging summary for pie (always from full allPOs, no filter on pie)
  const agingSummary = useMemo(() => {
    const map = {}; BUCKETS.forEach(b => map[b] = { pos: 0, openAmt: 0 });
    allPOs.forEach(p => { map[p.bucket].pos++; map[p.bucket].openAmt += p["Open Amt"]; });
    return BUCKETS.map(b => ({ bucket: b, name: b, value: map[b].pos, openAmt: map[b].openAmt })).filter(d => d.value > 0);
  }, []);

  // Vendor stacked bar: split by DS vs non-DS
  const vendorBar = useMemo(() => {
    const map = {};
    filteredLines.forEach(r => {
      if (!map[r.Vendor]) map[r.Vendor] = { vendor: r.Vendor.split(" ")[0], full: r.Vendor, standard: 0, dropShip: 0 };
      if (r["Drop Ship"] === "Yes") map[r.Vendor].dropShip += r["Open Amt"];
      else map[r.Vendor].standard += r["Open Amt"];
    });
    return Object.values(map).map(v => ({ ...v, total: v.standard + v.dropShip })).sort((a, b) => b.total - a.total).slice(0, 6);
  }, [filteredLines]);

  const tableData = detailView === "pos" ? filteredPOs : filteredLines;
  const sorted = useMemo(() => [...tableData].sort((a, b) => {
    let av = a[sortCol] ?? "", bv = b[sortCol] ?? "";
    if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
    return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  }), [tableData, sortCol, sortDir]);

  const totalOpenAmt = filteredLines.reduce((s, r) => s + r["Open Amt"], 0);
  const filteredDropShipPOs = filteredPOs.filter(p => p["Drop Ship"] === "Yes").length;

  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  }

  const TH = "#c8d6e8"; // bright table header text
  const TB = "#dde6f0"; // bright table body text
  const TM = "#a8b9cc"; // medium body text

  const Th = ({ col, label, right }) => (
    <th onClick={() => toggleSort(col)} style={{ padding: "10px 12px", textAlign: right ? "right" : "left", color: sortCol === col ? "#93c5fd" : TH, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none", background: "#060c18", borderBottom: "1px solid #1e3a5f" }}>
      {label}{sortCol === col ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
    </th>
  );

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#060c18", minHeight: "100vh", color: TB }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d1f42 0%, #060c18 100%)", borderBottom: "1px solid #1e3a5f", padding: "18px 28px 14px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 4, height: 36, background: "linear-gradient(180deg,#60a5fa,#22d3ee)", borderRadius: 4 }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.3px", color: "#f0f6ff" }}>Operations Dashboard</div>
          <div style={{ fontSize: 11, color: "#6b8aaa", marginTop: 2 }}>As of {TODAY.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
        </div>
        {/* Tab switcher */}
        <div style={{ display: "flex", marginLeft: "auto", background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, overflow: "hidden" }}>
          {[["po", "📦 Open Purchase Orders"], ["so", "🛒 Open Sales Orders"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              style={{ padding: "8px 20px", fontSize: 13, fontWeight: 700, background: activeTab === key ? "#1e3a5f" : "transparent", color: activeTab === key ? "#93c5fd" : "#6b8aaa", border: "none", cursor: "pointer", transition: "all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1500, margin: "0 auto" }}>
        {activeTab === "po" && (<div>

        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 12, marginBottom: 20 }}>
          {/* Open POs card — includes DS split */}
          <div style={{ background: "#0d1a30", border: "1px solid #1e4a8f44", borderRadius: 10, padding: "14px 16px", gridColumn: "span 1" }}>
            <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Open POs</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>{allPOs.length}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span style={{ background: "#16335588", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: "#93c5fd", fontWeight: 600 }}>
                🏭 {allPOs.length - allDropShipPOs} Standard
              </span>
              <span style={{ background: "#2d1b5588", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: "#c084fc", fontWeight: 600 }}>
                🚚 {allDropShipPOs} Drop Ship
              </span>
            </div>
          </div>

          {/* Weekly Change card */}
          <div style={{ background: "#0d1a30", border: "1px solid #1e4a8f44", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Weekly Change</div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>+{newPOs}</div>
                <div style={{ fontSize: 10, color: "#4a6a88", marginTop: 4 }}>New POs</div>
              </div>
              <div style={{ width: 1, background: "#1e3a5f", alignSelf: "stretch", margin: "2px 0" }} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#4ade80", lineHeight: 1 }}>{closedPOs}</div>
                <div style={{ fontSize: 10, color: "#4a6a88", marginTop: 4 }}>Closed POs</div>
              </div>
            </div>
          </div>

          {[
            { label: "Total Open Amount", value: fmt$(lines.reduce((s, r) => s + r["Open Amt"], 0)), sub: "backordered value", color: "#22d3ee", big: true },
            { label: "Vendors", value: new Set(lines.map(r => r.Vendor)).size, sub: "active suppliers", color: "#a78bfa" },
            { label: "Line Items", value: lines.length, sub: "open detail lines", color: "#94a3b8" },
          ].map(k => (
            <div key={k.label} style={{ background: "#0d1a30", border: `1px solid ${k.color}22`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: k.big ? 22 : 28, fontWeight: 900, color: k.color, lineHeight: 1, wordBreak: "break-all" }}>{k.value}</div>
              <div style={{ fontSize: 10, color: "#3d5570", marginTop: 5 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Weekly PO Trend — full width between KPIs and Aging */}
        <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Weekly PO Trend</div>
            <div style={{ fontSize: 10, color: "#4a6a88" }}>
              <span style={{ color: "#f97316", fontWeight: 700 }}>&#9135; Total Open &nbsp;</span>
              <span style={{ color: "#60a5fa", fontWeight: 700 }}>&#9135; New POs &nbsp;</span>
              <span style={{ color: "#4ade80", fontWeight: 700 }}>&#9135; Closed POs</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={WEEKLY_HISTORY} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="week" tick={{ fill: "#8aa8c8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b8aaa", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, "auto"]} />
              <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                formatter={(v, name) => [v ?? "N/A", name === "total" ? "Total Open POs" : name === "newPOs" ? "New POs" : "Closed POs"]} />
              <Line type="monotone" dataKey="total" name="total" stroke="#f97316" strokeWidth={3} dot={{ fill: "#f97316", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
              <Line type="monotone" dataKey="newPOs" name="newPOs" stroke="#60a5fa" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#60a5fa", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
              <Line type="monotone" dataKey="closed" name="closed" stroke="#4ade80" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#4ade80", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Aging Buckets */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Aging Report — Click a bucket to filter</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {BUCKETS.map(b => {
              const info = agingSummary.find(x => x.bucket === b) || { pos: 0, openAmt: 0 };
              const active = selectedBucket === b;
              return (
                <button key={b} onClick={() => setSelectedBucket(active ? null : b)}
                  style={{ background: active ? BCOLORS[b] + "20" : "#0d1a30", border: `2px solid ${active ? BCOLORS[b] : "#1e3a5f"}`, borderRadius: 10, padding: "14px 10px", cursor: "pointer", transition: "all 0.15s", textAlign: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: BCOLORS[b], margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 13, color: "#8aa8c8", marginBottom: 6, fontWeight: 700 }}>{b}</div>
                  <div style={{ fontSize: 38, fontWeight: 900, color: BCOLORS[b], lineHeight: 1 }}>{info.pos}</div>
                  <div style={{ height: 1, background: "#1e3a5f", margin: "8px 0" }} />
                  <div style={{ fontSize: 15, color: "#c8d6e8", fontWeight: 700 }}>{fmtK(info.openAmt)}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99" }}>open amount</div>
                </button>
              );
            })}
          </div>
          {selectedBucket && (
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "#6b8aaa" }}>
              Filtered: <span style={{ color: BCOLORS[selectedBucket], fontWeight: 700 }}>{selectedBucket}</span>
              <button onClick={() => setSelectedBucket(null)} style={{ marginLeft: 10, background: "none", border: "none", color: "#6b8aaa", cursor: "pointer", textDecoration: "underline", fontSize: 12 }}>clear</button>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
            Insights — Click a card to filter
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
            {[
              { key: "pastDue", label: "Past Due (Need Update ETA)", icon: "⚠️", count: insightsAll.pastDue.length, color: "#f87171", sub: `${insightsAll.pastDue.reduce((s, p) => s + p["Open Amt"], 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} at risk` },
              { key: "onTrack", label: "On Track", icon: "✅", count: insightsAll.onTrack.length, color: "#4ade80", sub: "ETA confirmed, not yet due" },
              { key: "noETA", label: "No ETA Provided", icon: "❓", count: insightsAll.noETA.length, color: "#fbbf24", sub: "vendor hasn't confirmed date" },
              { key: "partial", label: "Partially Received", icon: "📦", count: insightsAll.partial.length, color: "#60a5fa", sub: `${partialLines.length} line items in progress` },
            ].map(c => {
              const active = insightFilter === c.key;
              const clickable = c.key !== "onTrack";
              return (
                <button key={c.key} disabled={!clickable} onClick={() => clickable && setInsightFilter(active ? null : c.key)}
                  style={{ background: active ? c.color + "1c" : "#0d1a30", border: `2px solid ${active ? c.color : "#1e3a5f"}`, borderRadius: 10, padding: "14px 16px", cursor: clickable ? "pointer" : "default", textAlign: "left", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{c.icon} {c.label}</span>
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.count}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99", marginTop: 6 }}>{c.sub}</div>
                </button>
              );
            })}
          </div>
          {insightFilter && (
            <div style={{ marginBottom: 14, textAlign: "center", fontSize: 12, color: "#6b8aaa" }}>
              Filtered by insight: <span style={{ fontWeight: 700, color: "#e2e8f0" }}>
                {insightFilter === "pastDue" ? "Past Due" : insightFilter === "noETA" ? "No ETA" : "Partially Received"}
              </span>
              <button onClick={() => setInsightFilter(null)} style={{ marginLeft: 10, background: "none", border: "none", color: "#6b8aaa", cursor: "pointer", textDecoration: "underline", fontSize: 12 }}>clear</button>
            </div>
          )}

        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, marginBottom: 20 }}>

          {/* PIE: Open POs by Aging */}
          <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f" }}>
            <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>Open POs by Aging Bucket</div>
            <div style={{ fontSize: 10, color: "#4a6a88", marginBottom: 10 }}>All {allPOs.length} POs · click slice to filter</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie data={agingSummary} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={36}
                    labelLine={false} label={CustomPieLabel}
                    onClick={(d) => setSelectedBucket(selectedBucket === d.bucket ? null : d.bucket)}
                    style={{ cursor: "pointer" }}>
                    {agingSummary.map((d, i) => (
                      <Cell key={i} fill={BCOLORS[d.bucket]} opacity={selectedBucket && selectedBucket !== d.bucket ? 0.35 : 1} stroke={selectedBucket === d.bucket ? "#fff" : "none"} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                    formatter={(v, n, p) => [`${v} POs · ${fmtK(p.payload.openAmt)}`, p.payload.name]} />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div style={{ flex: 1 }}>
                {agingSummary.map(d => (
                  <div key={d.bucket} onClick={() => setSelectedBucket(selectedBucket === d.bucket ? null : d.bucket)}
                    style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7, cursor: "pointer", opacity: selectedBucket && selectedBucket !== d.bucket ? 0.4 : 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: BCOLORS[d.bucket], flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 10, color: "#8aa8c8", fontWeight: 600 }}>{d.bucket}</div>
                      <div style={{ fontSize: 11, color: "#c8d6e8", fontWeight: 700 }}>{d.value} POs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STACKED BAR: Open Amount by Vendor, split by Drop Ship */}
          <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f" }}>
            <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>Open Amount by Vendor</div>
            <div style={{ fontSize: 10, color: "#4a6a88", marginBottom: 12 }}>
              {selectedVendor !== "All Vendors" || selectedBucket ? "Filtered view · " : ""}
              <span style={{ color: "#60a5fa" }}>■</span> Standard &nbsp;
              <span style={{ color: "#c084fc" }}>■</span> Drop Ship &nbsp;·&nbsp;
              <span style={{ color: "#6b8aaa" }}>click bar to filter</span>
            </div>
            <ResponsiveContainer width="100%" height={196}>
              <BarChart data={vendorBar} layout="vertical" barSize={16} barGap={2}
                onClick={e => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const clicked = e.activePayload[0].payload.full;
                    setSelectedVendor(selectedVendor === clicked ? "All Vendors" : clicked);
                  }
                }}>
                <XAxis type="number" tick={{ fill: "#6b8aaa", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => "$" + (v / 1000).toFixed(0) + "K"} />
                <YAxis dataKey="vendor" type="category" tick={{ fill: "#8aa8c8", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} width={68} />
                <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                  formatter={(v, name, p) => [fmt$(v), name === "standard" ? "Standard" : "Drop Ship"]}
                  labelFormatter={(l, payload) => payload?.[0]?.payload?.full || l} cursor={{ fill: "#ffffff08" }} />
                <Bar dataKey="standard" name="standard" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} style={{ cursor: "pointer" }}
                  onClick={(d) => setSelectedVendor(selectedVendor === d.full ? "All Vendors" : d.full)} />
                <Bar dataKey="dropShip" name="dropShip" stackId="a" fill="#a855f7" radius={[0, 4, 4, 0]} style={{ cursor: "pointer" }}
                  onClick={(d) => setSelectedVendor(selectedVendor === d.full ? "All Vendors" : d.full)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* LINE CHART removed from here — moved between KPIs and Aging Report */}
        </div>

        {/* Filters + Toggle */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <select value={selectedVendor} onChange={e => setSelectedVendor(e.target.value)}
            style={{ background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, color: "#b0c8e0", padding: "7px 10px", fontSize: 12, cursor: "pointer", outline: "none" }}>
            {vendors.map(v => <option key={v}>{v}</option>)}
          </select>
          <input placeholder="Search PO#..." value={searchPO} onChange={e => setSearchPO(e.target.value)}
            style={{ background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, color: "#dde6f0", padding: "7px 10px", fontSize: 12, outline: "none", width: 150 }} />
          <div style={{ display: "flex", background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, overflow: "hidden" }}>
            {["pos", "lines"].map(v => (
              <button key={v} onClick={() => setDetailView(v)}
                style={{ padding: "7px 14px", fontSize: 12, background: detailView === v ? "#1e3a5f" : "transparent", color: detailView === v ? "#93c5fd" : "#6b8aaa", border: "none", cursor: "pointer", fontWeight: detailView === v ? 700 : 500 }}>
                {v === "pos" ? "PO Summary" : "Line Detail"}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "#6b8aaa" }}>
            Showing <span style={{ color: "#93c5fd", fontWeight: 700 }}>{filteredPOs.length}</span> POs
            {filteredDropShipPOs > 0 && <span style={{ color: "#c084fc", fontWeight: 700 }}> ({filteredDropShipPOs} DS)</span>}
            &nbsp;·&nbsp;<span style={{ color: "#22d3ee", fontWeight: 700 }}>{fmt$(totalOpenAmt)}</span> open
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#0d1a30", borderRadius: 10, border: "1px solid #1e3a5f", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {detailView === "pos" ? <>
                    <Th col="PO #" label="PO #" /><Th col="PO Date" label="PO Date" /><Th col="Vendor" label="Vendor" />
                    <Th col="Ordered" label="Ordered" right /><Th col="Backordered" label="Backordered" right />
                    <Th col="Received" label="Received" right /><Th col="Open Amt" label="Open Amt" right />
                    <Th col="ETA" label="Latest ETA" /><Th col="days" label="Age" /><Th col="Drop Ship" label="Drop Shipment" />
                  </> : <>
                    <Th col="PO #" label="PO #" /><Th col="PO Date" label="PO Date" /><Th col="Vendor" label="Vendor" />
                    <Th col="Item" label="Item" /><Th col="Backordered" label="Backordered" right />
                    <Th col="Open Amt" label="Open Amt" right /><Th col="ETA" label="ETA" />
                    <Th col="days" label="Age" /><Th col="Drop Ship" label="Drop Shipment" />
                  </>}
                </tr>
              </thead>
              <tbody>
                {sorted.map((r, i) => {
                  const isEven = i % 2 === 0;
                  const isDS = r["Drop Ship"] === "Yes";
                  const isPO = detailView === "pos";
                  const isExpanded = expandedPO === i && isPO;
                  const bg = isEven ? "#0d1a30" : "#0a1628";
                  return [
                    <tr key={`r${i}`} onClick={() => isPO && setExpandedPO(isExpanded ? null : i)}
                      style={{ borderBottom: "1px solid #0a1225", background: bg, cursor: isPO ? "pointer" : "default" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#152540"}
                      onMouseLeave={e => e.currentTarget.style.background = bg}>
                      <td style={{ padding: "9px 12px", color: "#7cc4f8", fontWeight: 700 }}>{r["PO #"]}</td>
                      <td style={{ padding: "9px 12px", color: "#7a9cbf" }}>{r["PO Date"]}</td>
                      <td style={{ padding: "9px 12px", color: "#b0c8e0", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }} title={r.Vendor}>{r.Vendor}</td>
                      {isPO ? <>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#7a9cbf" }}>{r.Ordered.toLocaleString()}</td>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 700 }}>{r.Backordered.toLocaleString()}</td>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#7a9cbf" }}>{r.Received.toLocaleString()}</td>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#34d399", fontWeight: 800 }}>{fmt$(r["Open Amt"])}</td>
                        <td style={{ padding: "9px 12px", color: r.ETA ? "#8aa8c8" : "#2a3d55" }}>{r.ETA || "—"}</td>
                      </> : <>
                        <td style={{ padding: "9px 12px", color: "#7a9cbf", fontFamily: "monospace", fontSize: 11 }}>{r.Item}</td>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 700 }}>{r.Backordered.toLocaleString()}</td>
                        <td style={{ padding: "9px 12px", textAlign: "right", color: "#34d399", fontWeight: 800 }}>{fmt$(r["Open Amt"])}</td>
                        <td style={{ padding: "9px 12px", color: r.ETA ? "#8aa8c8" : "#2a3d55" }}>{r.ETA || "—"}</td>
                      </>}
                      <td style={{ padding: "9px 12px" }}>
                        <span style={{ background: BCOLORS[r.bucket] + "20", color: BCOLORS[r.bucket], borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{r.days}d</span>
                      </td>
                      <td style={{ padding: "9px 12px", textAlign: "center" }}>
                        {isDS ? <span style={{ background: "#3b1d6e", color: "#c084fc", borderRadius: 4, padding: "2px 7px", fontSize: 11, fontWeight: 700 }}>DS</span>
                          : <span style={{ color: "#1e3a5f" }}>—</span>}
                      </td>
                    </tr>,
                    isExpanded && r.lines && (
                      <tr key={`exp${i}`}>
                        <td colSpan={10} style={{ background: "#070e1c", padding: 0, borderBottom: "2px solid #1e3a5f" }}>
                          <div style={{ padding: "10px 20px" }}>
                            <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Line Items — PO {r["PO #"]}</div>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                              <thead>
                                <tr>{["Item", "Description", "Ordered", "Backordered", "Open Amt", "ETA"].map(h => (
                                  <th key={h} style={{ padding: "5px 10px", textAlign: ["Ordered","Backordered","Open Amt"].includes(h) ? "right" : "left", color: "#5a7a99", fontWeight: 700, textTransform: "uppercase", fontSize: 10, borderBottom: "1px solid #1e293b" }}>{h}</th>
                                ))}</tr>
                              </thead>
                              <tbody>
                                {r.lines.map((l, li) => (
                                  <tr key={li} style={{ borderBottom: "1px solid #0d1628" }}>
                                    <td style={{ padding: "5px 10px", color: "#7a9cbf", fontFamily: "monospace", fontSize: 10 }}>{l.Item}</td>
                                    <td style={{ padding: "5px 10px", color: "#8aa8c8", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={l.Description}>{l.Description}</td>
                                    <td style={{ padding: "5px 10px", textAlign: "right", color: "#7a9cbf" }}>{l.Ordered.toLocaleString()}</td>
                                    <td style={{ padding: "5px 10px", textAlign: "right", color: "#fbbf24", fontWeight: 600 }}>{l.Backordered.toLocaleString()}</td>
                                    <td style={{ padding: "5px 10px", textAlign: "right", color: "#34d399", fontWeight: 700 }}>{fmt$(l["Open Amt"])}</td>
                                    <td style={{ padding: "5px 10px", color: "#6b8aaa" }}>{l.ETA || "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )
                  ];
                })}
                {sorted.length === 0 && (
                  <tr><td colSpan={10} style={{ padding: 40, textAlign: "center", color: "#2a3d55" }}>No records match the current filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: "#2a3d55", textAlign: "center" }}>
          PO Summary: click a row to expand line items · Click pie slices or aging buckets to filter · Click column headers to sort
        </div>
        </div>)}

        {/* ── SALES ORDERS TAB ── */}
        {activeTab === "so" && (<div>
          {/* SO KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 12, marginBottom: 20 }}>
            {/* Open SOs card */}
            <div style={{ background: "#0d1a30", border: "1px solid #1e4a8f44", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Open Sales Orders</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>{allSOs.length}</div>
              <div style={{ fontSize: 10, color: "#3d5570", marginTop: 5 }}>unique orders</div>
            </div>
            {/* Weekly Change card */}
            <div style={{ background: "#0d1a30", border: "1px solid #1e4a8f44", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Weekly Change</div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>+{newSOsCount}</div>
                  <div style={{ fontSize: 10, color: "#4a6a88", marginTop: 4 }}>New SOs</div>
                </div>
                <div style={{ width: 1, background: "#1e3a5f", alignSelf: "stretch", margin: "2px 0" }} />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#4ade80", lineHeight: 1 }}>{closedSOsCount}</div>
                  <div style={{ fontSize: 10, color: "#4a6a88", marginTop: 4 }}>Closed SOs</div>
                </div>
              </div>
            </div>
            {[
              { label: "Total Open Amount", value: fmt$(soLines.reduce((s, r) => s + r["Open Amt"], 0)), sub: "revenue pending", color: "#22d3ee", big: true },
              { label: "Customers", value: new Set(soLines.map(r => r.Customer)).size, sub: "active accounts", color: "#a78bfa" },
              { label: "Line Items", value: soLines.length, sub: "open detail lines", color: "#94a3b8" },
              { label: "Partially Shipped", value: soInsights.partial.length, sub: "orders in progress", color: "#4ade80" },
            ].map(k => (
              <div key={k.label} style={{ background: "#0d1a30", border: `1px solid ${k.color}22`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: k.big ? 22 : 28, fontWeight: 900, color: k.color, lineHeight: 1, wordBreak: "break-all" }}>{k.value}</div>
                <div style={{ fontSize: 10, color: "#3d5570", marginTop: 5 }}>{k.sub}</div>
              </div>
            ))}
          </div>


          {/* SO Weekly Trend */}
          <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Weekly SO Trend</div>
              <div style={{ fontSize: 10, color: "#4a6a88" }}>
                <span style={{ color: "#f97316", fontWeight: 700 }}>&#9135; Total Open &nbsp;</span>
                <span style={{ color: "#60a5fa", fontWeight: 700 }}>&#9135; New SOs &nbsp;</span>
                <span style={{ color: "#4ade80", fontWeight: 700 }}>&#9135; Closed SOs</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={SO_WEEKLY_HISTORY} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="week" tick={{ fill: "#8aa8c8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b8aaa", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, "auto"]} />
                <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                  formatter={(v, name) => [v ?? "N/A", name === "total" ? "Total Open SOs" : name === "newSOs" ? "New SOs" : "Closed SOs"]} />
                <Line type="monotone" dataKey="total" name="total" stroke="#f97316" strokeWidth={3} dot={{ fill: "#f97316", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
                <Line type="monotone" dataKey="newSOs" name="newSOs" stroke="#60a5fa" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#60a5fa", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
                <Line type="monotone" dataKey="closed" name="closed" stroke="#4ade80" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill: "#4ade80", r: 5, strokeWidth: 0 }} activeDot={{ r: 7 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SO Aging Buckets */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Aging Report — Click a bucket to filter</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {BUCKETS.map(b => {
                const info = soAgingSummary.find(x => x.bucket === b) || { value: 0, openAmt: 0 };
                const active = soBucket === b;
                return (
                  <button key={b} onClick={() => setSoBucket(active ? null : b)}
                    style={{ background: active ? BCOLORS[b] + "20" : "#0d1a30", border: `2px solid ${active ? BCOLORS[b] : "#1e3a5f"}`, borderRadius: 10, padding: "14px 10px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: BCOLORS[b], margin: "0 auto 8px" }} />
                    <div style={{ fontSize: 13, color: "#8aa8c8", marginBottom: 6, fontWeight: 700 }}>{b}</div>
                    <div style={{ fontSize: 38, fontWeight: 900, color: BCOLORS[b], lineHeight: 1 }}>{info.value}</div>
                    <div style={{ height: 1, background: "#1e3a5f", margin: "8px 0" }} />
                    <div style={{ fontSize: 15, color: "#c8d6e8", fontWeight: 700 }}>{fmtK(info.openAmt)}</div>
                    <div style={{ fontSize: 10, color: "#5a7a99" }}>open amount</div>
                  </button>
                );
              })}
            </div>
            {soBucket && (
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "#6b8aaa" }}>
                Filtered: <span style={{ color: BCOLORS[soBucket], fontWeight: 700 }}>{soBucket}</span>
                <button onClick={() => setSoBucket(null)} style={{ marginLeft: 10, background: "none", border: "none", color: "#6b8aaa", cursor: "pointer", textDecoration: "underline", fontSize: 12 }}>clear</button>
              </div>
            )}
          </div>

          {/* SO Insights */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b8aaa", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Insights</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[
                { label: "Past Due (Need Follow-up)", icon: "⚠️", count: soInsights.pastDue.length, color: "#fbbf24", sub: fmt$(soInsights.pastDue.reduce((s, p) => s + p["Open Amt"], 0)) + " at risk" },
                { label: "On Track", icon: "✅", count: soInsights.onTrack.length, color: "#4ade80", sub: "Due date confirmed" },
                { label: "No Due Date", icon: "❓", count: soInsights.noDate.length, color: "#60a5fa", sub: "Date not confirmed" },
                { label: "Partially Shipped", icon: "📦", count: soInsights.partial.length, color: "#a78bfa", sub: "In progress" },
              ].map(c => (
                <div key={c.label} style={{ background: "#0d1a30", border: `2px solid ${c.color}33`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>{c.icon} {c.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.count}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99", marginTop: 6 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SO Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Open SOs by Aging Bucket</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={soAgingSummary} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={36}
                    labelLine={false} label={CustomPieLabel}
                    onClick={d => setSoBucket(soBucket === d.bucket ? null : d.bucket)} style={{ cursor: "pointer" }}>
                    {soAgingSummary.map((d, i) => <Cell key={i} fill={BCOLORS[d.bucket]} opacity={soBucket && soBucket !== d.bucket ? 0.35 : 1} stroke={soBucket === d.bucket ? "#fff" : "none"} strokeWidth={2} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                    formatter={(v, n, p) => [`${v} SOs · ${fmtK(p.payload.openAmt)}`, p.payload.name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#0d1a30", borderRadius: 10, padding: 18, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 11, color: "#8aa8c8", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>Open Amount by Customer</div>
              <div style={{ fontSize: 10, color: "#4a6a88", marginBottom: 12 }}>click bar to filter</div>
              <ResponsiveContainer width="100%" height={196}>
                <BarChart data={customerBar} layout="vertical" barSize={16}
                  onClick={e => { if (e?.activePayload?.[0]) { const c = e.activePayload[0].payload.full; setSoCustomer(soCustomer === c ? "All Customers" : c); } }}>
                  <XAxis type="number" tick={{ fill: "#6b8aaa", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => "$" + (v / 1000).toFixed(0) + "K"} />
                  <YAxis dataKey="customer" type="category" tick={{ fill: "#8aa8c8", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                    formatter={(v, n, p) => [fmt$(v), p.payload.full]} cursor={{ fill: "#ffffff08" }} />
                  <Bar dataKey="openAmt" fill="#60a5fa" radius={[0, 4, 4, 0]} style={{ cursor: "pointer" }}
                    onClick={d => setSoCustomer(soCustomer === d.full ? "All Customers" : d.full)} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SO Filters + Table */}
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            <select value={soCustomer} onChange={e => setSoCustomer(e.target.value)}
              style={{ background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, color: "#b0c8e0", padding: "7px 10px", fontSize: 12, cursor: "pointer", outline: "none" }}>
              {soCustomers.map(c => <option key={c}>{c}</option>)}
            </select>
            <input placeholder="Search Order#..." value={soSearch} onChange={e => setSoSearch(e.target.value)}
              style={{ background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, color: "#dde6f0", padding: "7px 10px", fontSize: 12, outline: "none", width: 160 }} />
            <div style={{ display: "flex", background: "#0d1a30", border: "1px solid #1e3a5f", borderRadius: 6, overflow: "hidden" }}>
              {["sos", "lines"].map(v => (
                <button key={v} onClick={() => setSoDetailView(v)}
                  style={{ padding: "7px 14px", fontSize: 12, background: soDetailView === v ? "#1e3a5f" : "transparent", color: soDetailView === v ? "#93c5fd" : "#6b8aaa", border: "none", cursor: "pointer", fontWeight: soDetailView === v ? 700 : 500 }}>
                  {v === "sos" ? "SO Summary" : "Line Detail"}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: "auto", fontSize: 12, color: "#6b8aaa" }}>
              Showing <span style={{ color: "#93c5fd", fontWeight: 700 }}>{filteredSOs.length}</span> SOs · <span style={{ color: "#22d3ee", fontWeight: 700 }}>{fmt$(filteredSOLines.reduce((s, r) => s + r["Open Amt"], 0))}</span> open
            </div>
          </div>

          <div style={{ background: "#0d1a30", borderRadius: 10, border: "1px solid #1e3a5f", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    {soDetailView === "sos" ? <>
                      <SOTh col="Order #" label="Order #" /><SOTh col="Order Date" label="Order Date" /><SOTh col="Customer" label="Customer" />
                      <SOTh col="Customer Type" label="Type" /><SOTh col="Ordered" label="Ordered" right /><SOTh col="Shipped" label="Shipped" right />
                      <SOTh col="Backordered" label="Backordered" right /><SOTh col="Open Amt" label="Open Amt" right />
                      <SOTh col="Due Date" label="Due Date" /><SOTh col="days" label="Age" />
                    </> : <>
                      <SOTh col="Order #" label="Order #" /><SOTh col="Order Date" label="Order Date" /><SOTh col="Customer" label="Customer" />
                      <SOTh col="Item" label="Item" /><SOTh col="Backordered" label="Backordered" right />
                      <SOTh col="Open Amt" label="Open Amt" right /><SOTh col="Due Date" label="Due Date" /><SOTh col="days" label="Age" />
                    </>}
                  </tr>
                </thead>
                <tbody>
                  {soSorted.map((r, i) => {
                    const isEven = i % 2 === 0;
                    const isSO = soDetailView === "sos";
                    const isExpanded = soExpandedRow === i && isSO;
                    const bg = isEven ? "#0d1a30" : "#0a1628";
                    const todayStr = TODAY.toISOString().split('T')[0];
                    const isPastDue = r["Due Date"] && r["Due Date"] < todayStr;
                    return [
                      <tr key={`sr${i}`} onClick={() => isSO && setSoExpandedRow(isExpanded ? null : i)}
                        style={{ borderBottom: "1px solid #0a1225", background: bg, cursor: isSO ? "pointer" : "default" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#152540"}
                        onMouseLeave={e => e.currentTarget.style.background = bg}>
                        <td style={{ padding: "9px 12px", color: "#7cc4f8", fontWeight: 700 }}>{r["Order #"]}</td>
                        <td style={{ padding: "9px 12px", color: "#7a9cbf" }}>{r["Order Date"]}</td>
                        <td style={{ padding: "9px 12px", color: "#b0c8e0", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }} title={r.Customer}>{r.Customer}</td>
                        {isSO ? <>
                          <td style={{ padding: "9px 12px", color: "#7a9cbf", fontSize: 11 }}>{r["Customer Type"]}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#7a9cbf" }}>{r.Ordered?.toLocaleString()}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#7a9cbf" }}>{r.Shipped?.toLocaleString()}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 700 }}>{r.Backordered?.toLocaleString()}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#34d399", fontWeight: 800 }}>{fmt$(r["Open Amt"])}</td>
                        </> : <>
                          <td style={{ padding: "9px 12px", color: "#7a9cbf", fontFamily: "monospace", fontSize: 11 }}>{r.Item}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 700 }}>{r.Backordered?.toLocaleString()}</td>
                          <td style={{ padding: "9px 12px", textAlign: "right", color: "#34d399", fontWeight: 800 }}>{fmt$(r["Open Amt"])}</td>
                        </>}
                        <td style={{ padding: "9px 12px", color: isPastDue ? "#fbbf24" : r["Due Date"] ? "#8aa8c8" : "#2a3d55", fontWeight: isPastDue ? 700 : 400 }}>
                          {r["Due Date"] || "—"}{isPastDue ? " ⚠️" : ""}
                        </td>
                        <td style={{ padding: "9px 12px" }}>
                          <span style={{ background: BCOLORS[r.bucket] + "20", color: BCOLORS[r.bucket], borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{r.days}d</span>
                        </td>
                      </tr>,
                      isExpanded && r.lines && (
                        <tr key={`sexp${i}`}>
                          <td colSpan={10} style={{ background: "#070e1c", padding: 0, borderBottom: "2px solid #1e3a5f" }}>
                            <div style={{ padding: "10px 20px" }}>
                              <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Line Items — Order {r["Order #"]}</div>
                              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                                <thead>
                                  <tr>{["Item","Description","Ordered","Shipped","Backordered","Open Amt","Due Date"].map(h => (
                                    <th key={h} style={{ padding: "5px 10px", textAlign: ["Ordered","Shipped","Backordered","Open Amt"].includes(h) ? "right" : "left", color: "#5a7a99", fontWeight: 700, textTransform: "uppercase", fontSize: 10, borderBottom: "1px solid #1e293b" }}>{h}</th>
                                  ))}</tr>
                                </thead>
                                <tbody>
                                  {r.lines.map((l, li) => {
                                    const lPastDue = l["Due Date"] && l["Due Date"] < todayStr;
                                    return (
                                      <tr key={li} style={{ borderBottom: "1px solid #0d1628" }}>
                                        <td style={{ padding: "5px 10px", color: "#7a9cbf", fontFamily: "monospace", fontSize: 10 }}>{l.Item}</td>
                                        <td style={{ padding: "5px 10px", color: "#8aa8c8", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={l.Description}>{l.Description}</td>
                                        <td style={{ padding: "5px 10px", textAlign: "right", color: "#7a9cbf" }}>{l.Ordered?.toLocaleString()}</td>
                                        <td style={{ padding: "5px 10px", textAlign: "right", color: "#7a9cbf" }}>{l.Shipped?.toLocaleString()}</td>
                                        <td style={{ padding: "5px 10px", textAlign: "right", color: "#fbbf24", fontWeight: 600 }}>{l.Backordered?.toLocaleString()}</td>
                                        <td style={{ padding: "5px 10px", textAlign: "right", color: "#34d399", fontWeight: 700 }}>{fmt$(l["Open Amt"])}</td>
                                        <td style={{ padding: "5px 10px", color: lPastDue ? "#fbbf24" : "#6b8aaa", fontWeight: lPastDue ? 700 : 400 }}>{l["Due Date"] || "—"}{lPastDue ? " ⚠️" : ""}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )
                    ];
                  })}
                  {soSorted.length === 0 && (
                    <tr><td colSpan={10} style={{ padding: 40, textAlign: "center", color: "#2a3d55" }}>No records match the current filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#2a3d55", textAlign: "center" }}>
            SO Summary: click a row to expand line items · Click pie slices or aging buckets to filter · ⚠️ indicates past due date
          </div>
        </div>)}
      </div>
    </div>
  );
}
