import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const RAW_DATA = [{"PO #": "P-80310", "PO Date": "2026-02-24", "Vendor": "STAR STAINLESS SCREW CO.", "Item": "PSMKLN0420SSBO", "Description": "1/4-20 KEPS LOCK NUT EXTERNAL TOOTH STAINLESS BLACK OXIDE (RELEASE 1/2 UPON ARRIVAL, 1/4 3 MONTHS LATER AND FINAL 1/4 3 MONTHS AFTER THAT, ALL PREPAID SHIPPING)", "Ordered": 700000, "Backordered": 700000, "Received": 0, "Open Amt": 30086.0, "ETA": "2026-03-26", "Drop Ship": "No"}, {"PO #": "P-80310", "PO Date": "2026-02-24", "Vendor": "STAR STAINLESS SCREW CO.", "Item": "PSMBSC042012SSBO", "Description": "1/4-20X3/4 BUTTON SOCKET CAP SCREW STAINLESS BLACK OXIDE (RELEASE 1/2 UPON ARRIVAL, 1/4 3 MONTHS LATER AND FINAL 1/4 3 MONTHS AFTER THAT, ALL PREPAID SHIPPING)", "Ordered": 700000, "Backordered": 700000, "Received": 0, "Open Amt": 29680.0, "ETA": "2026-03-26", "Drop Ship": "No"}, {"PO #": "20172805", "PO Date": "2026-03-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08BZ", "Description": "1/2\" USS FLAT WASHER  BLACK ZINC w/SEALER", "Ordered": 197200, "Backordered": 197200, "Received": 0, "Open Amt": 12104.14, "ETA": "2026-10-02", "Drop Ship": "No"}, {"PO #": "20172812", "PO Date": "2026-03-11", "Vendor": "STELFAST INC", "Item": "PSMCB0616165BZ", "Description": "3/8\"-16x1\",(FT) CARRIAGE BOLTS GRADE 5 .0002 ZINC BLACK WITH SEALER", "Ordered": 60000, "Backordered": 60000, "Received": 0, "Open Amt": 4062.0, "ETA": "2026-04-10", "Drop Ship": "No"}, {"PO #": "20172812", "PO Date": "2026-03-11", "Vendor": "STELFAST INC", "Item": "PSMSFN0616BZ", "Description": "3/8 - 16 SERRATED FLANGE NUT BLACK ZINC", "Ordered": 144000, "Backordered": 144000, "Received": 0, "Open Amt": 4795.2, "ETA": "2026-04-10", "Drop Ship": "No"}, {"PO #": "20172813", "PO Date": "2026-03-11", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB08135RH24BZ", "Description": "1/2-13 X 1-1/2 ROUND HEAD CARRIAGE BOLT GRADE 5 BLACK ZINC w/sealer", "Ordered": 250000, "Backordered": 250000, "Received": 0, "Open Amt": 41387.5, "ETA": "2026-10-02", "Drop Ship": "No"}, {"PO #": "2017858", "PO Date": "2026-05-19", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08BZ", "Description": "1/2\" USS FLAT WASHER  BLACK ZINC", "Ordered": 52200, "Backordered": 52200, "Received": 0, "Open Amt": 4489.2, "ETA": "2026-06-18", "Drop Ship": "No"}, {"PO #": "20172859", "PO Date": "2026-05-22", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "PSMHC02518143SS", "Description": "HINGE CLIP .025 - 1.8X1.43 STAINLESS", "Ordered": 2500, "Backordered": 2500, "Received": 0, "Open Amt": 3750.0, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "20172859", "PO Date": "2026-05-22", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "TOOLING", "Description": "TOOLING ONE TIME CHARGE", "Ordered": 1, "Backordered": 1, "Received": 0, "Open Amt": 1995.0, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "20172861", "PO Date": "2026-05-22", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW07EG", "Description": "7/16\" USS FLAT WASHER ZINC", "Ordered": 3600, "Backordered": 3500, "Received": 100, "Open Amt": 4427.5, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "20172861", "PO Date": "2026-05-22", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW05EG", "Description": "5/16\" USS FLAT WASHER ZINC", "Ordered": 3730, "Backordered": 3680, "Received": 50, "Open Amt": 3815.79, "ETA": "2026-06-21", "Drop Ship": "No"}, {"PO #": "P-80265", "PO Date": "2026-06-01", "Vendor": "CLINTON ALUMINUM", "Item": "GI540-1023", "Description": ".125 X .75 X 144\" FLT STOCK 6061-T6511 ALUMINUM", "Ordered": 3000, "Backordered": 3000, "Received": 0, "Open Amt": 19200.0, "ETA": "2026-06-05", "Drop Ship": "No"}, {"PO #": "P-80267", "PO Date": "2026-06-01", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB08135RH24BZ", "Description": "1/2-13 X 1-1/2 ROUND HEAD CARRIAGE BOLT GRADE A BLACK ZINC", "Ordered": 28800, "Backordered": 28800, "Received": 0, "Open Amt": 7919.71, "ETA": "2026-06-15", "Drop Ship": "No"}, {"PO #": "P-80267", "PO Date": "2026-06-01", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "SPECIAL", "Description": "Break in fee", "Ordered": 1, "Backordered": 1, "Received": 0, "Open Amt": 1000.0, "ETA": "2026-06-15", "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW10Y", "Description": "5/8\" USS FLAT WASHER ZINC YELLOW", "Ordered": 1740, "Backordered": 1740, "Received": 0, "Open Amt": 224.79, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW088YZN", "Description": "WASHER FLAT 1/2 GR8  Y ZN", "Ordered": 3480, "Backordered": 3480, "Received": 0, "Open Amt": 214.68, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0616EG", "Description": "3/8-16 FINISHED HEX NUT ZINC", "Ordered": 11400, "Backordered": 11400, "Received": 0, "Open Amt": 228.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW06EG", "Description": "3/8\" USS FLAT WASHER ZINC", "Ordered": 5800, "Backordered": 5800, "Received": 0, "Open Amt": 95.76, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08135HH24EG", "Description": "1/2-13 X 1-1/2 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 10800, "Backordered": 10800, "Received": 0, "Open Amt": 1551.31, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0518EG", "Description": "5/16-18 FINISHED HEX NUT ZINC", "Ordered": 6800, "Backordered": 6800, "Received": 0, "Open Amt": 111.32, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN08138EG", "Description": "1/2\"-13 FINISHED HEX NUTS GRADE 8 COARSE MED. CARBON ZINC-YELLOW", "Ordered": 2400, "Backordered": 2400, "Received": 0, "Open Amt": 123.41, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCSM14245109YZ", "Description": "M14-2.00x45 MM,(FT) DIN 933 COARSE HEX CAP SCREWS 10.9 DIN 933 COARSE ZINC YELLOW", "Ordered": 1500, "Backordered": 1500, "Received": 0, "Open Amt": 727.62, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80272", "PO Date": "2026-06-08", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS10116408YZ", "Description": "5/8\"-11x4\",(PT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW", "Ordered": 900, "Backordered": 900, "Received": 0, "Open Amt": 675.12, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80279", "PO Date": "2026-06-17", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "CS - SB35", "Description": "35\" SHELTER BUMPER, 6\" FACE YELLOW PAINTED STEEL", "Ordered": 200, "Backordered": 200, "Received": 0, "Open Amt": 11600.0, "ETA": "2026-07-17", "Drop Ship": "No"}, {"PO #": "P-80280", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80281", "PO Date": "2026-06-17", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMPPT32AC", "Description": "2inx110yd(100m), 1.8mil, Acrylic-Clear PROFERRED PACKAGING TAPE", "Ordered": 24, "Backordered": 24, "Received": 0, "Open Amt": 57.6, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 7675.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 921.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80282", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80283", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 25000, "Backordered": 25000, "Received": 0, "Open Amt": 38375.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 7000, "Backordered": 7000, "Received": 0, "Open Amt": 10745.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80284", "PO Date": "2026-06-17", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80285", "PO Date": "2026-06-18", "Vendor": "PHD MFG INC", "Item": "PSM1011AHDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 69480.0, "ETA": "2026-07-01", "Drop Ship": "Yes"}, {"PO #": "P-80286", "PO Date": "2026-06-18", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12300, "Backordered": 12300, "Received": 0, "Open Amt": 46740.0, "ETA": "2026-07-02", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1211PG", "Description": "13/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 2042.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80288", "PO Date": "2026-06-19", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-06-30", "Drop Ship": "Yes"}, {"PO #": "P-80289", "PO Date": "2026-06-19", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH80EG", "Description": "1/2\"-13x 5\",(PT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW BAKE", "Ordered": 4375, "Backordered": 125, "Received": 4250, "Open Amt": 76.37, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80292", "PO Date": "2026-06-23", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-28", "Drop Ship": "Yes"}, {"PO #": "P-80293", "PO Date": "2026-06-23", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 24600, "Backordered": 24600, "Received": 0, "Open Amt": 93480.0, "ETA": "2026-07-20", "Drop Ship": "Yes"}, {"PO #": "P-80295", "PO Date": "2026-06-23", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMAMLN0813CBZ", "Description": "1/2-13 GRADE C STOVER LOCK NUT BLACK ZINC", "Ordered": 27000, "Backordered": 27000, "Received": 0, "Open Amt": 3077.73, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSBHH121080P", "Description": "3/4-10X5 HEAVY HEX STRUCTURAL BOLT PLAIN", "Ordered": 260, "Backordered": 260, "Received": 0, "Open Amt": 375.18, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS06165HH16EG", "Description": "3/8-16X 1\" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 900, "Backordered": 900, "Received": 0, "Open Amt": 45.93, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMDWS69104BHBP", "Description": "6-9x 1-1/4\"  DRYWALL SCREWS BUGLE HEAD BLACK PHOSPHATE", "Ordered": 8000, "Backordered": 8000, "Received": 0, "Open Amt": 44.96, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMTCS061612HWHISFZ", "Description": "3/8\"-16x3/4\" INDENT HWH SLOT THREAD CUTTING SCREWS TYPE F ZINC", "Ordered": 800, "Backordered": 800, "Received": 0, "Open Amt": 136.69, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFSC071436BO", "Description": "7/16\"-14x2 1/4\" FLAT SOCKET CAPS THERMAL BLACK OXIDE", "Ordered": 222, "Backordered": 222, "Received": 0, "Open Amt": 123.12, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCSM14245109EG", "Description": "M14-2.00x45 MM,(FT) DIN 933 HEX CAP SCREWS 10.9 DIN 933 COARSE ALLOY ZINC", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 569.31, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCSM101545Z", "Description": "M10-1.50 X 45 8.8 HEX CAP SCREW ZINC", "Ordered": 500, "Backordered": 500, "Received": 0, "Open Amt": 71.69, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08135HH40EG", "Description": "1/2-13 X 2-1/2\" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 450, "Backordered": 450, "Received": 0, "Open Amt": 96.87, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSTS141020FHPS", "Description": "#14-10x1 1/4\",(FT) FLAT HEAD PHIL TAPPING SCREWS TYPE A STAINLESS", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 301.15, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80296", "PO Date": "2026-06-24", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08EG", "Description": "1/2\" USS FLAT WASHER ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80297", "PO Date": "2026-06-24", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1011HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2350.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1611PG", "Description": "2-7/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1612PG", "Description": "2-7/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 2010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212PG", "Description": "13/16 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 2040.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1512AHDG", "Description": "1 5/8 X 3 1/4 WELDED BACK TO BACK  12 GAUGE SLOTTED STRUT 20' LENGTHS HDG", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 9190.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1612AHDG", "Description": "1 5/8 X 2 7/16 12 GA WELDED BACK TO BACK SLOTTED HOT DIPPED GALVANIZED 20' LENGTHS", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 15780.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 740.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1012HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF  SLOT CHANNEL 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 9400.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212AHDG", "Description": "13/16 X 1 5/8 X 20' 12 GAGE HALF SLOTTED WELDED BACK TO BACK  CHANNEL HOT DIPPED GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 4010.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1212HDG", "Description": "13/16 X 1 5/8 12 GAGE  HALF SLOTTED CHANNEL HDG 20' LENGTHS", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 1630.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1480.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1511PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 300, "Backordered": 300, "Received": 0, "Open Amt": 732.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80278", "PO Date": "2026-06-25", "Vendor": "OEG", "Item": "PSM1012AHDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF  SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH HOT-DIP GALVANIZED", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 5450.0, "ETA": "2026-07-22", "Drop Ship": "No"}, {"PO #": "P-80299", "PO Date": "2026-06-25", "Vendor": "PHD MFG INC", "Item": "PSM1011HDG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH HOT-DIP GALVANIZED", "Ordered": 11000, "Backordered": 11000, "Received": 0, "Open Amt": 28435.0, "ETA": "2026-07-22", "Drop Ship": "Yes"}, {"PO #": "P-80301", "PO Date": "2026-06-25", "Vendor": "DEPENDABLE STAMPING COMPANY", "Item": "GI510-1013", "Description": "1-7/8\" X 1-7/8\" SLOTTED JAM BRACKET", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 5200.0, "ETA": "2026-07-27", "Drop Ship": "No"}, {"PO #": "P-80303", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 16000, "Backordered": 16000, "Received": 0, "Open Amt": 24560.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80303", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1012PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 7675.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 4000, "Backordered": 4000, "Received": 0, "Open Amt": 15200.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 12840.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80304", "PO Date": "2026-06-26", "Vendor": "PHD MFG INC", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 6420.0, "ETA": "2026-07-21", "Drop Ship": "Yes"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW07EG", "Description": "7/16\" USS FLAT WASHER ZINC", "Ordered": 7200, "Backordered": 7200, "Received": 0, "Open Amt": 253.01, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW085EG", "Description": "1/2\" USS FLAT WASHER GRADE 5 ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0518EG", "Description": "5/16-18 FINISHED HEX NUT ZINC", "Ordered": 3400, "Backordered": 3400, "Received": 0, "Open Amt": 55.66, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCB0616RH32HDG", "Description": "3/8\"-16x 2\",(FT) CARRIAGE BOLTS A307 GRADE A COARSE HDG", "Ordered": 5500, "Backordered": 5500, "Received": 0, "Open Amt": 617.16, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0613HDG", "Description": "3/8\"-16 HEX NUTS COARSE LOW CARBON HDG", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 126.3, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW06EG", "Description": "3/8\" USS FLAT WASHER ZINC", "Ordered": 20300, "Backordered": 20300, "Received": 0, "Open Amt": 335.15, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH16EG", "Description": "5/16-18X 1\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1400, "Backordered": 1400, "Received": 0, "Open Amt": 50.72, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW065EG", "Description": "3/8\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 15000, "Backordered": 15000, "Received": 0, "Open Amt": 139.95, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 265.44, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFHN0714EG", "Description": "7/16-14 FINISH HEX NUTS ZINC", "Ordered": 2400, "Backordered": 2400, "Received": 0, "Open Amt": 121.22, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH20EG", "Description": "5/16-18X 1-1/4\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1100, "Backordered": 1100, "Received": 0, "Open Amt": 48.88, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH28YZ", "Description": "1/2\"-13x 1-3/4\",(FT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW", "Ordered": 9900, "Backordered": 9900, "Received": 0, "Open Amt": 2311.16, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80305", "PO Date": "2026-06-26", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH32ZD", "Description": "1/2-13 X 2 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 11250, "Backordered": 11250, "Received": 0, "Open Amt": 2893.84, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80306", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80306", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80307", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 15350.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80307", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1012APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 20' LENGTH PRE-GALV", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 22800.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80308", "PO Date": "2026-07-01", "Vendor": "PHD MFG INC", "Item": "PSM1011APG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL WELDED BACK TO BACK 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 45600.0, "ETA": "2026-08-17", "Drop Ship": "Yes"}, {"PO #": "P-80309", "PO Date": "2026-07-01", "Vendor": "STAR STAINLESS SCREW CO.", "Item": "ZDS14202`4HHCSS1", "Description": "1/4-20 X 2 1/4\" HEX HEAD CAP SCREW 3/4\" THREAD LENGTH 18-8 STAINLESS", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 495.05, "ETA": "2026-07-07", "Drop Ship": "No"}, {"PO #": "P-80309", "PO Date": "2026-07-01", "Vendor": "STAR STAINLESS SCREW CO.", "Item": "ZDS1W25", "Description": "1/4\" REGULAR SPLIT LOCK WASHER MEDIUM 18-8 STAINLESS PER SUPPLIED DRAWING", "Ordered": 15000, "Backordered": 15000, "Received": 0, "Open Amt": 115.05, "ETA": "2026-07-07", "Drop Ship": "No"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1311PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 2000, "Backordered": 2000, "Received": 0, "Open Amt": 1842.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1511PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 200, "Backordered": 200, "Received": 0, "Open Amt": 605.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1111PG", "Description": "1-5/8 X 1-5/8 14 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 10000, "Backordered": 10000, "Received": 0, "Open Amt": 10700.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80311", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1112PG", "Description": "1-5/8 X 1-5/8 14 GA, HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 8000, "Backordered": 8000, "Received": 0, "Open Amt": 8560.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1011PG", "Description": "1-5/8 X 1-5/8 12 GA. HALF SLOT CHANNEL 10' LENGTH PRE-GALV", "Ordered": 12000, "Backordered": 12000, "Received": 0, "Open Amt": 18420.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1512PG", "Description": "3-1/4 X 1-5/8 12 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 15125.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80312", "PO Date": "2026-07-02", "Vendor": "PHD MFG INC", "Item": "PSM1312PG", "Description": "13/16 X 1-5/8 14 GA. HALF SLOT CHANNEL 20' LENGTH PRE-GALV", "Ordered": 5000, "Backordered": 5000, "Received": 0, "Open Amt": 4605.0, "ETA": "2026-07-17", "Drop Ship": "Yes"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMAMLN0813CEG", "Description": "1/2\"-13 ALL METAL HEX LOCKNUTS GRADE C MED. CARBON ZINC", "Ordered": 33750, "Backordered": 33750, "Received": 0, "Open Amt": 1847.81, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS05185HH16EG", "Description": "5/16-18X 1\"  HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1400, "Backordered": 1400, "Received": 0, "Open Amt": 50.72, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS04205HH16EG", "Description": "1/4-20 X 1 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 6600, "Backordered": 6600, "Received": 0, "Open Amt": 171.86, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMUFW08EG", "Description": "1/2\" USS FLAT WASHER ELECTRO-GALV", "Ordered": 41760, "Backordered": 41760, "Received": 0, "Open Amt": 1595.23, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMMS0420CH06EG", "Description": "1/4-20 X 3/4\" INDENTED HEX COMBINATION HEAD MACHINE SCREW ZINC", "Ordered": 6000, "Backordered": 6000, "Received": 0, "Open Amt": 106.5, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMSLW085EG", "Description": "1/2\" SPLIT LOCK WASHER GRADE 5 ELECTRO-GALV", "Ordered": 14000, "Backordered": 14000, "Received": 0, "Open Amt": 265.44, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH32ZD", "Description": "1/2-13 X 2 HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 11250, "Backordered": 11250, "Received": 0, "Open Amt": 2893.84, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08138HH80EG", "Description": "1/2\"-13x 5\",(PT) HEX CAP SCREWS GRADE 8 COARSE ZINC-YELLOW BAKE", "Ordered": 4500, "Backordered": 4500, "Received": 0, "Open Amt": 2846.3, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMFW0416EG", "Description": "1/4 X 1 FENDER WASHER ELECTRO-GALV", "Ordered": 6760, "Backordered": 6760, "Received": 0, "Open Amt": 117.89, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS07145HH24EG", "Description": "7/16-14 X 1-1/2 \" HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1000, "Backordered": 1000, "Received": 0, "Open Amt": 131.57, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS08135HH24EG", "Description": "1/2-13 X 1-1/2 HEX HEAD CAP SCREW GRADE 5 ZINC", "Ordered": 1500, "Backordered": 1500, "Received": 0, "Open Amt": 213.42, "ETA": null, "Drop Ship": "No"}, {"PO #": "P-80313", "PO Date": "2026-07-03", "Vendor": "BRIGHTON BEST INTERNATIONAL", "Item": "PSMCS07148HH32ZD", "Description": "7/16-14X 2\" HEX HEAD CAP SCREW GRADE 8 YELLOW ZINC", "Ordered": 400, "Backordered": 400, "Received": 0, "Open Amt": 91.04, "ETA": null, "Drop Ship": "No"}];

const TODAY = new Date("2026-07-04");
const daysDiff = d => Math.floor((TODAY - new Date(d)) / 86400000);
const ageBucket = d => d < 30 ? "< 1 Month" : d < 90 ? "1–3 Months" : d < 180 ? "3–6 Months" : d < 365 ? "6–12 Months" : "> 12 Months";
const BUCKETS = ["< 1 Month", "1–3 Months", "3–6 Months", "6–12 Months", "> 12 Months"];
const BCOLORS = { "< 1 Month": "#4ade80", "1–3 Months": "#60a5fa", "3–6 Months": "#fbbf24", "6–12 Months": "#fb923c", "> 12 Months": "#f87171" };
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

// ── Insights helpers ──
// A PO is "Past Due" if it has at least one line with an ETA in the past
// A PO has "No ETA" if NONE of its lines have an ETA
// A PO is "Partially Received" if it has Received > 0 on at least one line (and is still open)
function classifyPOs(pos) {
  let pastDue = [], noETA = [], onTrack = [], partial = [];
  pos.forEach(p => {
    const etas = p.lines.map(l => l.ETA).filter(Boolean);
    const hasAnyETA = etas.length > 0;
    const minETA = hasAnyETA ? etas.sort()[0] : null;
    const isPastDue = hasAnyETA && minETA < "2026-07-03";
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
    const daysLate = Math.floor((new Date("2026-07-04") - new Date(minETA)) / 86400000);
    return { ...p, minETA, daysLate };
  }).sort((a, b) => b.daysLate - a.daysLate);

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

export default function Dashboard() {
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
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
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.3px", color: "#f0f6ff" }}>Open Purchase Order Dashboard</div>
          <div style={{ fontSize: 11, color: "#6b8aaa", marginTop: 2 }}>As of {TODAY.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
        </div>
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1500, margin: "0 auto" }}>

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

          {[
            { label: "Total Open Amount", value: fmt$(lines.reduce((s, r) => s + r["Open Amt"], 0)), sub: "backordered value", color: "#22d3ee", big: true },
            { label: "Total Backordered", value: lines.reduce((s, r) => s + r.Backordered, 0).toLocaleString(), sub: "units pending", color: "#fbbf24" },
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
                  <div style={{ fontSize: 10, color: "#8aa8c8", marginBottom: 6, fontWeight: 700 }}>{b}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: BCOLORS[b], lineHeight: 1 }}>{info.pos}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99", marginTop: 3 }}>open POs</div>
                  <div style={{ height: 1, background: "#1e3a5f", margin: "8px 0" }} />
                  <div style={{ fontSize: 13, color: "#c8d6e8", fontWeight: 700 }}>{fmtK(info.openAmt)}</div>
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
              { key: "pastDue", label: "Past Due", icon: "⚠️", count: insightsAll.pastDue.length, color: "#f87171", sub: `${insightsAll.pastDue.reduce((s, p) => s + p["Open Amt"], 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} at risk` },
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

          {/* Detail strips: worst overdue + partial receipts closest to done */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Most overdue POs */}
            <div style={{ background: "#0d1a30", borderRadius: 10, padding: 16, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 11, color: "#f87171", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                🔴 Most Overdue POs
              </div>
              {overdueDetail.length === 0 ? (
                <div style={{ fontSize: 12, color: "#5a7a99", padding: "8px 0" }}>No overdue POs — everything is on track.</div>
              ) : (
                <div>
                  {overdueDetail.slice(0, 5).map(p => (
                    <div key={p["PO #"]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #142238" }}>
                      <div>
                        <span style={{ color: "#7cc4f8", fontWeight: 700, fontSize: 12 }}>{p["PO #"]}</span>
                        <span style={{ color: "#7a9cbf", fontSize: 11, marginLeft: 8 }}>{p.Vendor.split(" ").slice(0, 2).join(" ")}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ background: "#3d1414", color: "#f87171", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{p.daysLate}d late</span>
                        <span style={{ color: "#34d399", fontSize: 11, fontWeight: 700, marginLeft: 8 }}>{fmt$(p["Open Amt"])}</span>
                      </div>
                    </div>
                  ))}
                  {overdueDetail.length > 5 && <div style={{ fontSize: 10, color: "#5a7a99", marginTop: 8 }}>+{overdueDetail.length - 5} more — use the "Past Due" filter above to see all</div>}
                </div>
              )}
            </div>

            {/* Closest to fully received */}
            <div style={{ background: "#0d1a30", borderRadius: 10, padding: 16, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 11, color: "#60a5fa", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                📦 Closest to Fully Received
              </div>
              {partialLines.length === 0 ? (
                <div style={{ fontSize: 12, color: "#5a7a99", padding: "8px 0" }}>No partial receipts on open lines.</div>
              ) : (
                <div>
                  {partialLines.slice(0, 5).map((l, i) => (
                    <div key={i} style={{ padding: "7px 0", borderBottom: "1px solid #142238" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ color: "#7cc4f8", fontWeight: 700, fontSize: 12 }}>{l["PO #"]}</span>
                          <span style={{ color: "#7a9cbf", fontSize: 11, marginLeft: 8, fontFamily: "monospace" }}>{l.Item}</span>
                        </div>
                        <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 700 }}>{l.Backordered.toLocaleString()} pcs left</span>
                      </div>
                      <div style={{ marginTop: 4, height: 5, background: "#162338", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${(l.pctReceived * 100).toFixed(0)}%`, height: "100%", background: "#60a5fa" }} />
                      </div>
                      <div style={{ fontSize: 10, color: "#5a7a99", marginTop: 3 }}>{l.Received.toLocaleString()} of {l.Ordered.toLocaleString()} received ({(l.pctReceived * 100).toFixed(0)}%)</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16, marginBottom: 20 }}>

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
              <span style={{ color: "#c084fc" }}>■</span> Drop Ship
            </div>
            <ResponsiveContainer width="100%" height={196}>
              <BarChart data={vendorBar} layout="vertical" barSize={16} barGap={2}>
                <XAxis type="number" tick={{ fill: "#6b8aaa", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => "$" + (v / 1000).toFixed(0) + "K"} />
                <YAxis dataKey="vendor" type="category" tick={{ fill: "#8aa8c8", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} width={68} />
                <Tooltip contentStyle={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, color: "#dde6f0", fontSize: 12 }}
                  formatter={(v, name, p) => [fmt$(v), name === "standard" ? "Standard" : "Drop Ship"]}
                  labelFormatter={(l, payload) => payload?.[0]?.payload?.full || l} />
                <Bar dataKey="standard" name="standard" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="dropShip" name="dropShip" stackId="a" fill="#a855f7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
                    <Th col="ETA" label="Latest ETA" /><Th col="days" label="Age" /><Th col="Drop Ship" label="DS" />
                  </> : <>
                    <Th col="PO #" label="PO #" /><Th col="PO Date" label="PO Date" /><Th col="Vendor" label="Vendor" />
                    <Th col="Item" label="Item" /><Th col="Backordered" label="Backordered" right />
                    <Th col="Open Amt" label="Open Amt" right /><Th col="ETA" label="ETA" />
                    <Th col="days" label="Age" /><Th col="Drop Ship" label="DS" />
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
      </div>
    </div>
  );
}
