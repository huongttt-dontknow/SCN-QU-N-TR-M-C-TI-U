// AUTO-GENERATED V15 MASTER DATA FROM TEST DỮ LIỆU QUẢN LÝ HIỆU SUẤT.xlsx
export interface PeriodKpiVal {
  target?: number;
  actual?: number;
  pct?: number;
}

export interface MasterKpiItem {
  title: string;
  unit: string;
  formula?: string;
  pic?: string;
  periods: Record<string, PeriodKpiVal>;
}

export const MASTER_KPI_DATA: Record<string, Record<string, MasterKpiItem>> = {
  "SCVN": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "actual": 0.1647
        },
        "weekly_1_6": {
          "target": 0.06
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "actual": 0.1414
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_2": {
          "actual": 0.226,
          "pct": -0.088
        },
        "monthly_4": {
          "target": -0.15
        },
        "weekly_1_1": {
          "target": -0.209,
          "actual": -0.238
        },
        "weekly_1_2": {
          "target": -0.072,
          "actual": -0.332
        },
        "weekly_1_6": {
          "pct": -0.26
        },
        "weekly_2_1": {
          "target": -0.036,
          "pct": 0.077
        },
        "weekly_2_2": {
          "pct": 0.162
        },
        "weekly_2_3": {
          "pct": -0.119
        },
        "weekly_3_1": {
          "target": -0.035,
          "actual": 0.064
        },
        "weekly_3_2": {
          "target": -0.13,
          "actual": 0.023
        },
        "weekly_3_3": {
          "target": 0.025,
          "actual": 0.038
        },
        "weekly_4_1": {
          "target": -0.042,
          "actual": -0.04
        },
        "weekly_4_2": {
          "target": -0.104,
          "actual": -0.16
        },
        "weekly_4_3": {
          "target": 0.02,
          "actual": -0.18
        },
        "weekly_4_4": {
          "target": -0.013,
          "actual": -0.14
        },
        "weekly_4_5": {
          "target": -0.131,
          "actual": 4.16
        },
        "weekly_5_1": {
          "target": 0.338,
          "actual": 0.05
        },
        "weekly_5_2": {
          "target": -0.058,
          "actual": 0.1
        },
        "weekly_5_3": {
          "target": -0.048,
          "actual": 0.03
        },
        "weekly_5_4": {
          "target": 0.042,
          "actual": 0.09
        },
        "weekly_6_1": {
          "target": -0.013,
          "actual": -0.08
        },
        "weekly_6_2": {
          "target": 0.096,
          "actual": 0.07
        },
        "weekly_6_3": {
          "target": 0.061,
          "actual": 0.2
        },
        "weekly_6_4": {
          "target": 0.398,
          "actual": 0.61
        },
        "weekly_7_1": {
          "target": -0.205,
          "actual": 0.29
        },
        "weekly_7_2": {
          "target": 0.112,
          "actual": 0.31
        },
        "weekly_7_3": {
          "target": 0.053,
          "actual": 0.3
        },
        "weekly_7_4": {
          "target": -1.0,
          "actual": -1.0
        }
      }
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 10335554321.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.6,
          "actual": 1128989629.0,
          "pct": 821410630.0
        },
        "monthly_3": {
          "target": 6329220601.0,
          "actual": 4186973328.0,
          "pct": 0.66
        },
        "monthly_4": {
          "target": 6724266850.0,
          "actual": 3558947204.0,
          "pct": 0.53
        },
        "monthly_5": {
          "target": 7539058130.0,
          "actual": 3683073922.0,
          "pct": 0.49
        },
        "monthly_6": {
          "target": 7977676227.0,
          "actual": 3756037422.0,
          "pct": 0.47
        },
        "monthly_7": {
          "target": 8106194227.0,
          "actual": 2752630485.0,
          "pct": 0.34
        },
        "yearly_2026": {
          "target": 17445694841.0,
          "actual": 11544830786.0,
          "pct": 0.66
        },
        "quarterly_1": {
          "target": 22308644493.0,
          "actual": 11209651417.0,
          "pct": 0.5
        },
        "quarterly_2": {
          "target": 27762252722.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 1125229277.0,
          "actual": 631204636.0,
          "pct": 0.56
        },
        "weekly_1_2": {
          "target": 1052264727.0,
          "actual": 586055987.0,
          "pct": 0.56
        },
        "weekly_1_4": {
          "target": 0.73
        },
        "weekly_1_5": {
          "pct": 5631371932.0
        },
        "weekly_1_6": {
          "target": 3809707858.0,
          "actual": 0.677,
          "pct": 1171932090.0
        },
        "weekly_2_1": {
          "target": 608189998.0,
          "actual": 0.52,
          "pct": 1130833237.0
        },
        "weekly_2_2": {
          "target": 654805610.0,
          "actual": 0.58,
          "pct": 1126153237.0
        },
        "weekly_2_3": {
          "target": 761149637.0,
          "actual": 0.68,
          "pct": 1168507237.0
        },
        "weekly_2_4": {
          "target": 670511497.0,
          "actual": 0.57
        },
        "weekly_3_1": {
          "target": 1196867492.0,
          "actual": 646879222.0,
          "pct": 0.54
        },
        "weekly_3_2": {
          "target": 1211095289.0,
          "actual": 661850720.0,
          "pct": 0.55
        },
        "weekly_3_3": {
          "target": 1219798934.0,
          "actual": 686983164.0,
          "pct": 0.56
        },
        "weekly_3_4": {
          "target": 1242990934.0,
          "actual": 645077962.0,
          "pct": 0.52
        },
        "weekly_3_5": {
          "target": 667617750.0,
          "actual": 93808000.0,
          "pct": 0.14
        },
        "weekly_4_1": {
          "target": 1397716595.0,
          "actual": 618009750.0,
          "pct": 0.44
        },
        "weekly_4_2": {
          "target": 1481196768.0,
          "actual": 553938637.0,
          "pct": 0.37
        },
        "weekly_4_3": {
          "target": 1410710768.0,
          "actual": 564847054.0,
          "pct": 0.4
        },
        "weekly_4_4": {
          "target": 1405926768.0,
          "actual": 557656852.0,
          "pct": 0.4
        },
        "weekly_4_5": {
          "target": 1367656352.0,
          "actual": 484510333.0,
          "pct": 0.35
        },
        "weekly_5_1": {
          "target": 1459081009.0,
          "actual": 648138188.0,
          "pct": 0.44
        },
        "weekly_5_2": {
          "target": 1426388995.0,
          "actual": 610458400.0,
          "pct": 0.43
        },
        "weekly_5_3": {
          "target": 1443970063.0,
          "actual": 581358043.0,
          "pct": 0.4
        },
        "weekly_5_4": {
          "target": 1443970063.0,
          "actual": 605669369.0,
          "pct": 0.42
        },
        "weekly_6_1": {
          "target": 1507127493.0,
          "actual": 597900898.0,
          "pct": 0.4
        },
        "weekly_6_2": {
          "target": 1520770926.0,
          "actual": 655401872.0,
          "pct": 0.43
        },
        "weekly_6_3": {
          "target": 1490661183.0,
          "actual": 695492188.0,
          "pct": 0.47
        },
        "weekly_6_4": {
          "target": 1382427866.0,
          "actual": 972125118.0,
          "pct": 0.7
        },
        "weekly_7_1": {
          "target": 1239062050.0,
          "actual": 772425345.0,
          "pct": 0.62
        },
        "weekly_7_2": {
          "target": 1414693225.0,
          "actual": 858699668.0,
          "pct": 0.61
        },
        "weekly_7_3": {
          "target": 1411521225.0,
          "actual": 904152502.0,
          "pct": 0.64
        },
        "weekly_7_4": {
          "target": 1385885225.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Tuần": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "DT phát sinh trong kỳ đánh giá",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 5.0,
          "pct": 5.0
        },
        "monthly_3": {
          "target": 10.0,
          "actual": 232326875.0,
          "pct": 0.72
        },
        "monthly_4": {
          "target": 0.95,
          "actual": 4.0,
          "pct": 0.63
        },
        "monthly_5": {
          "target": 0.95,
          "actual": 3.0,
          "pct": 0.65
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 4.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.95,
          "actual": 254561030.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 15.0,
          "actual": 28.0,
          "pct": 0.5
        },
        "quarterly_1": {
          "target": 15.0,
          "actual": 3.0,
          "pct": 0.4
        },
        "quarterly_2": {
          "target": 15.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "target": 0.23,
          "pct": 10.0
        },
        "weekly_1_6": {
          "target": 12.0,
          "actual": 0.88,
          "pct": 5.0
        },
        "weekly_2_1": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 6.0
        },
        "weekly_2_2": {
          "target": 6.0,
          "actual": 1.0,
          "pct": 8.0
        },
        "weekly_2_3": {
          "target": 8.0,
          "actual": 1.0,
          "pct": 8.0
        },
        "weekly_2_4": {
          "target": 8.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 8.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 8.0,
          "pct": 0.0
        },
        "weekly_2_5": {
          "actual": 0.0974
        }
      }
    },
    "ThienNX": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "BP AS",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 1514240000.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 3.0
        },
        "monthly_3": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 0.7
        },
        "monthly_4": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 0.66
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 5.0,
          "actual": 7.0,
          "pct": 0.65
        },
        "monthly_7": {
          "target": 5.0,
          "actual": 31167502.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 15.0,
          "actual": 19.0,
          "pct": 1.66
        },
        "quarterly_1": {
          "target": 10.0,
          "actual": 0.0,
          "pct": 0.82
        },
        "quarterly_2": {
          "target": 1384344000.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "target": -0.0037,
          "pct": 5.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "actual": 0.72,
          "pct": 4.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_3": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_4": {
          "target": 2.0,
          "actual": 0.67
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.67
        },
        "weekly_5_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4075191.0,
          "pct": 0.0
        },
        "weekly_7_3": {
          "target": 6800000.0,
          "actual": 4049347.0,
          "pct": 0.6
        },
        "weekly_7_4": {
          "target": 6800000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_2_5": {
          "actual": 0.1903
        }
      }
    },
    "ThinhTQ": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "BP NDTH",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_2": {
          "target": 0.76,
          "actual": 9600000.0,
          "pct": 7897562.0
        },
        "monthly_3": {
          "target": 0.95,
          "actual": 0.0,
          "pct": 1.27
        },
        "monthly_4": {
          "target": 5.0,
          "actual": 10.0,
          "pct": 0.89
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 1.5
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 7.0,
          "pct": 0.97
        },
        "monthly_7": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.72
        },
        "yearly_2026": {
          "target": 6.0,
          "actual": 15.0,
          "pct": 0.28
        },
        "quarterly_1": {
          "target": 10.0,
          "actual": 4.0,
          "pct": 1.18
        },
        "quarterly_2": {
          "target": 10.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 9600000.0,
          "actual": 8007260.0,
          "pct": 0.83
        },
        "weekly_1_2": {
          "target": 9600000.0,
          "actual": 6461451.0,
          "pct": 0.67
        },
        "weekly_1_4": {
          "target": 0.82
        },
        "weekly_1_5": {
          "target": 0.1279,
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 1.14,
          "pct": 9966250.0
        },
        "weekly_2_1": {
          "target": 8506899.0,
          "actual": 0.85,
          "pct": 9966250.0
        },
        "weekly_2_2": {
          "target": 13467750.0,
          "actual": 1.35,
          "pct": 9966250.0
        },
        "weekly_2_3": {
          "target": 12609988.0,
          "actual": 1.27,
          "pct": 9966250.0
        },
        "weekly_2_4": {
          "target": 12993294.0,
          "actual": 1.3
        },
        "weekly_3_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 13802375.0,
          "actual": 21335715.0,
          "pct": 1.55
        },
        "weekly_3_3": {
          "target": 13802375.0,
          "actual": 13983505.0,
          "pct": 1.01
        },
        "weekly_3_4": {
          "target": 13802375.0,
          "actual": 13802375.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 7.0,
          "actual": 8742015.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 12250000.0,
          "actual": 12391949.0,
          "pct": 1.01
        },
        "weekly_4_3": {
          "target": 12250000.0,
          "actual": 11068333.0,
          "pct": 0.9
        },
        "weekly_4_4": {
          "target": 12250000.0,
          "actual": 11590232.0,
          "pct": 0.95
        },
        "weekly_4_5": {
          "target": 12250000.0,
          "actual": 6568510.0,
          "pct": 0.54
        },
        "weekly_5_1": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 13500000.0,
          "actual": 11068333.0,
          "pct": 0.82
        },
        "weekly_5_3": {
          "target": 13500000.0,
          "actual": 8218015.0,
          "pct": 0.61
        },
        "weekly_5_4": {
          "target": 13500000.0,
          "actual": 6640466.0,
          "pct": 0.49
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_6_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 5.0,
          "actual": 13734536.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0,
          "pct": 0.0
        },
        "weekly_2_5": {
          "actual": -0.0637
        }
      }
    },
    "HangLQ": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "DA Lego",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 4.0,
          "pct": 4.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 6.0,
          "pct": 0.62
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.09
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 2.0,
          "pct": 1.29
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.07
        },
        "monthly_7": {
          "target": 1.0,
          "actual": 0.9,
          "pct": 0.04
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 9.0,
          "pct": 0.58
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 1.1
        },
        "quarterly_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "target": 0.2649,
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 6.0,
          "actual": 0.99,
          "pct": 2.0
        },
        "weekly_2_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_3": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 4.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0,
          "actual": 6.0,
          "pct": 1.5
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0,
          "pct": 0.0
        },
        "weekly_2_5": {
          "actual": -0.076
        }
      }
    },
    "DM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 1628219170.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.95,
          "actual": 107283975.0,
          "pct": 115441437.0
        },
        "monthly_3": {
          "actual": 1.0,
          "pct": 0.85,
          "target": 0.0
        },
        "monthly_4": {
          "target": 507000000.0,
          "pct": 0.88,
          "actual": 444086017.0
        },
        "monthly_5": {
          "target": 513000000.0,
          "actual": 446052131.0,
          "pct": 0.87
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.43
        },
        "monthly_7": {
          "target": 1.0,
          "actual": 331272676.0,
          "pct": 0.92
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 1.77
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.83
        },
        "quarterly_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 107197813.0,
          "actual": 148796480.0,
          "pct": 1.39
        },
        "weekly_1_2": {
          "target": 107197813.0,
          "actual": 109787158.0,
          "pct": 1.02
        },
        "weekly_1_4": {
          "target": 1.08
        },
        "weekly_1_5": {
          "target": -0.0698,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.78,
          "pct": 104509706.0
        },
        "weekly_2_1": {
          "target": 113265309.0,
          "actual": 1.08,
          "pct": 104509706.0
        },
        "weekly_2_2": {
          "target": 111180402.0,
          "actual": 1.06,
          "pct": 104509706.0
        },
        "weekly_2_3": {
          "target": 92960312.0,
          "actual": 0.89,
          "pct": 104509706.0
        },
        "weekly_2_4": {
          "target": 116473792.0,
          "actual": 1.11
        },
        "weekly_3_1": {
          "target": 129739812.0,
          "actual": 120936673.0,
          "pct": 0.93
        },
        "weekly_3_2": {
          "target": 129790812.0,
          "actual": 108068726.0,
          "pct": 0.83
        },
        "weekly_3_3": {
          "target": 130679445.0,
          "actual": 105870505.0,
          "pct": 0.81
        },
        "weekly_3_4": {
          "target": 129679445.0,
          "actual": 105000000.0,
          "pct": 0.81
        },
        "weekly_4_1": {
          "target": 129000000.0,
          "actual": 127248767.0,
          "pct": 0.99
        },
        "weekly_4_2": {
          "target": 129200000.0,
          "actual": 104483913.0,
          "pct": 0.81
        },
        "weekly_4_3": {
          "target": 129200000.0,
          "actual": 112037011.0,
          "pct": 0.87
        },
        "weekly_4_4": {
          "target": 128000000.0,
          "actual": 100316326.0,
          "pct": 0.78
        },
        "weekly_4_5": {
          "target": 128000000.0,
          "actual": 110858169.0,
          "pct": 0.87
        },
        "weekly_5_1": {
          "target": 128250000.0,
          "actual": 115494043.0,
          "pct": 0.9
        },
        "weekly_5_2": {
          "target": 128250000.0,
          "actual": 106384892.0,
          "pct": 0.83
        },
        "weekly_5_3": {
          "target": 140000000.0,
          "actual": 74048901.0,
          "pct": 0.53
        },
        "weekly_5_4": {
          "target": 140000000.0,
          "actual": 97145597.0,
          "pct": 0.69
        },
        "weekly_6_1": {
          "target": 135500000.0,
          "actual": 70794431.0,
          "pct": 0.52
        },
        "weekly_6_2": {
          "target": 144000000.0,
          "actual": 25069549.0,
          "pct": 0.17
        },
        "weekly_6_3": {
          "target": 144000000.0,
          "actual": 41292738.0,
          "pct": 0.29
        },
        "weekly_6_4": {
          "target": 144000000.0,
          "actual": 42730395.0,
          "pct": 0.3
        },
        "weekly_7_1": {
          "target": 71914000.0,
          "actual": 88850939.0,
          "pct": 1.24
        },
        "weekly_7_2": {
          "target": 71914000.0,
          "actual": 111764307.0,
          "pct": 1.55
        },
        "weekly_7_3": {
          "target": 71914000.0,
          "actual": 130657431.0,
          "pct": 1.82
        },
        "weekly_7_4": {
          "target": 71914000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_2_5": {
          "actual": -0.1639
        }
      }
    },
    "SM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_7": {
          "target": 0.95,
          "actual": 58553319.0,
          "pct": 0.77
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.36
        },
        "quarterly_2": {
          "target": 256215123.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "actual": 154088458.0
        },
        "weekly_6_4": {
          "target": 7850000.0,
          "actual": 11636259.0,
          "pct": 1.48
        },
        "weekly_7_1": {
          "target": 18919021.0,
          "actual": 15651619.0,
          "pct": 0.83
        },
        "weekly_7_2": {
          "target": 18919021.0,
          "actual": 25173299.0,
          "pct": 1.33
        },
        "weekly_7_3": {
          "target": 18919021.0,
          "actual": 17728401.0,
          "pct": 0.94
        },
        "weekly_7_4": {
          "target": 18919021.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 9.0,
          "actual": 9.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 2.0
        }
      }
    },
    "MM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_7": {
          "target": 0.85,
          "actual": 3739826.0,
          "pct": 0.68
        },
        "quarterly_1": {
          "target": 24722000.0,
          "actual": 15779573.0,
          "pct": 0.64
        },
        "quarterly_2": {
          "target": 20000000.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "actual": 25900478.0
        },
        "weekly_6_4": {
          "target": 3423501.0,
          "actual": 1093908.0,
          "pct": 0.32
        },
        "weekly_7_1": {
          "target": 1200000.0,
          "actual": 1247720.0,
          "pct": 1.04
        },
        "weekly_7_2": {
          "target": 1500000.0,
          "actual": 1220715.0,
          "pct": 0.81
        },
        "weekly_7_3": {
          "target": 1500000.0,
          "actual": 1271391.0,
          "pct": 0.85
        },
        "weekly_7_4": {
          "target": 1500000.0,
          "pct": 0.0,
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0
        },
        "monthly_6": {
          "target": 0.85,
          "actual": 2.0
        }
      }
    },
    "NM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_7": {
          "target": 0.95,
          "actual": 1953327.0,
          "pct": 0.19
        },
        "quarterly_1": {
          "target": 360000000.0,
          "actual": 232675174.0,
          "pct": 0.65
        },
        "quarterly_2": {
          "target": 1040000000.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "actual": 17096931.0
        },
        "weekly_6_4": {
          "target": 2000000.0,
          "actual": 1199201.0,
          "pct": 0.6
        },
        "weekly_7_1": {
          "target": 2194624.0,
          "actual": 605648.0,
          "pct": 0.28
        },
        "weekly_7_2": {
          "target": 2325806.0,
          "actual": 737300.0,
          "pct": 0.32
        },
        "weekly_7_3": {
          "target": 2325806.0,
          "actual": 610379.0,
          "pct": 0.26
        },
        "weekly_7_4": {
          "target": 2325806.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 3.0
        }
      }
    },
    "CM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_7": {
          "target": 0.95,
          "actual": 28926.0,
          "pct": 0.02
        },
        "quarterly_2": {
          "target": 282100000.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 10000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 100000.0,
          "actual": 5083.0,
          "pct": 0.05
        },
        "weekly_7_3": {
          "target": 250000.0,
          "actual": 23843.0,
          "pct": 0.1
        },
        "weekly_7_4": {
          "target": 500000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 6.0,
          "actual": 8.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0
        }
      }
    },
    "BP Creative": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_4": {
          "actual": 0.0
        },
        "monthly_5": {
          "target": 470600000.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 587600000.0,
          "actual": 0.0
        },
        "monthly_7": {
          "actual": 0.0
        },
        "yearly_2026": {
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 300000000.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        }
      }
    },
    "DA mới": {
      "title": "Tổng doanh thu",
      "unit": "BP WF",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 450000000.0,
          "actual": 450579925.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 500000000.0,
          "actual": 427740267.0,
          "pct": 0.86
        },
        "monthly_5": {
          "target": 450000000.0,
          "actual": 372115247.0,
          "pct": 0.83
        },
        "monthly_6": {
          "target": 450000000.0,
          "actual": 398068204.0,
          "pct": 0.88
        },
        "monthly_7": {
          "target": 450000000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1350000000.0,
          "actual": 1245536624.0,
          "pct": 0.92
        },
        "quarterly_1": {
          "target": 2100000000.0,
          "actual": 1197923718.0,
          "pct": 0.57
        },
        "quarterly_2": {
          "target": 1350000000.0
        },
        "weekly_1_5": {
          "pct": 450000000.0
        },
        "weekly_1_6": {
          "target": 421607296.0,
          "actual": 0.937
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu nội bộ",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 10101554321.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.58,
          "actual": 1048138016.0,
          "pct": 745495897.0
        },
        "monthly_3": {
          "target": 5329097081.0,
          "actual": 3312555737.0,
          "pct": 0.62
        },
        "monthly_4": {
          "target": 5610666850.0,
          "actual": 2861053674.0,
          "pct": 0.51
        },
        "monthly_5": {
          "target": 5968150944.0,
          "actual": 3026429476.0,
          "pct": 0.51
        },
        "monthly_6": {
          "target": 6205758090.0,
          "actual": 2727611847.0,
          "pct": 0.44
        },
        "monthly_7": {
          "target": 4855871485.0,
          "actual": 1180253335.0,
          "pct": 0.24
        },
        "yearly_2026": {
          "target": 14054425708.0,
          "actual": 9565101856.0,
          "pct": 0.68
        },
        "quarterly_1": {
          "target": 18051990969.0,
          "actual": 8224291430.0,
          "pct": 0.46
        },
        "quarterly_2": {
          "target": 11001639835.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 1044377664.0,
          "actual": 556371787.0,
          "pct": 0.53
        },
        "weekly_1_2": {
          "target": 971413114.0,
          "actual": 511871268.0,
          "pct": 0.53
        },
        "weekly_1_4": {
          "target": 0.71
        },
        "weekly_1_5": {
          "pct": 4809720359.0
        },
        "weekly_1_6": {
          "target": 3249858888.0,
          "actual": 0.68,
          "pct": 1109532090.0
        },
        "weekly_2_1": {
          "target": 595089998.0,
          "actual": 0.54,
          "pct": 1113933237.0
        },
        "weekly_2_2": {
          "target": 650438650.0,
          "actual": 0.58,
          "pct": 1109253237.0
        },
        "weekly_2_3": {
          "target": 755518557.0,
          "actual": 0.68,
          "pct": 1151607237.0
        },
        "weekly_2_4": {
          "target": 664843755.0,
          "actual": 0.58
        },
        "weekly_3_1": {
          "target": 1179967492.0,
          "actual": 642582982.0,
          "pct": 0.54
        },
        "weekly_3_2": {
          "target": 1194195289.0,
          "actual": 645803080.0,
          "pct": 0.54
        },
        "weekly_3_3": {
          "target": 1202898934.0,
          "actual": 675983164.0,
          "pct": 0.56
        },
        "weekly_3_4": {
          "target": 1226090934.0,
          "actual": 627077962.0,
          "pct": 0.51
        },
        "weekly_3_5": {
          "target": 667617750.0,
          "actual": 93808000.0,
          "pct": 0.14
        },
        "weekly_4_1": {
          "target": 1295696595.0,
          "actual": 598009750.0,
          "pct": 0.46
        },
        "weekly_4_2": {
          "target": 1379176768.0,
          "actual": 528908677.0,
          "pct": 0.38
        },
        "weekly_4_3": {
          "target": 1308690768.0,
          "actual": 535542054.0,
          "pct": 0.41
        },
        "weekly_4_4": {
          "target": 1303906768.0,
          "actual": 528767252.0,
          "pct": 0.41
        },
        "weekly_4_5": {
          "target": 1265636352.0,
          "actual": 455550013.0,
          "pct": 0.36
        },
        "weekly_5_1": {
          "target": 1339581009.0,
          "actual": 619438188.0,
          "pct": 0.46
        },
        "weekly_5_2": {
          "target": 1312868995.0,
          "actual": 610458400.0,
          "pct": 0.46
        },
        "weekly_5_3": {
          "target": 1330450063.0,
          "actual": 281894977.0,
          "pct": 0.21
        },
        "weekly_5_4": {
          "target": 1330450063.0,
          "actual": 267206303.0,
          "pct": 0.2
        },
        "weekly_6_1": {
          "target": 1443607493.0,
          "actual": 279105891.0,
          "pct": 0.19
        },
        "weekly_6_2": {
          "target": 1407250926.0,
          "actual": 298009039.0,
          "pct": 0.21
        },
        "weekly_6_3": {
          "target": 1427141183.0,
          "actual": 320184296.0,
          "pct": 0.22
        },
        "weekly_6_4": {
          "target": 1318907866.0,
          "actual": 331584667.0,
          "pct": 0.25
        },
        "weekly_7_1": {
          "target": 588940814.0,
          "actual": 428629973.0,
          "pct": 0.73
        },
        "weekly_7_2": {
          "target": 776072709.0,
          "actual": 450704833.0,
          "pct": 0.58
        },
        "weekly_7_3": {
          "target": 772900709.0,
          "actual": 470911272.0,
          "pct": 0.61
        },
        "weekly_7_4": {
          "target": 542305409.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "CM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 964148289.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 90955800.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 613464224.0,
          "pct": 0.0
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu chéo",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 156000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.55,
          "actual": 35204839.0,
          "pct": 34817959.0
        },
        "monthly_3": {
          "target": 231400000.0,
          "actual": 116792303.0,
          "pct": 0.5
        },
        "monthly_4": {
          "target": 283400000.0,
          "actual": 32184880.0,
          "pct": 0.11
        },
        "monthly_5": {
          "target": 286000000.0,
          "actual": 53700000.0,
          "pct": 0.19
        },
        "monthly_6": {
          "target": 299000000.0,
          "actual": 164049582.0,
          "pct": 0.55
        },
        "monthly_7": {
          "target": 52000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 813178198.0,
          "actual": 699382522.0,
          "pct": 0.86
        },
        "quarterly_1": {
          "target": 871000000.0,
          "actual": 249934462.0,
          "pct": 0.29
        },
        "quarterly_2": {
          "target": 156000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 96204839.0,
          "actual": 53735200.0,
          "pct": 0.56
        },
        "weekly_1_2": {
          "target": 96204839.0,
          "actual": 57546945.0,
          "pct": 0.6
        },
        "weekly_1_4": {
          "target": 0.99
        },
        "weekly_1_5": {
          "pct": 231400000.0
        },
        "weekly_1_6": {
          "target": 18700920.0,
          "actual": 0.08,
          "pct": 57850000.0
        },
        "weekly_2_1": {
          "target": 4000000.0,
          "actual": 0.07,
          "pct": 57850000.0
        },
        "weekly_2_2": {
          "target": 4366960.0,
          "actual": 0.08,
          "pct": 57850000.0
        },
        "weekly_2_3": {
          "target": 5631080.0,
          "actual": 0.1,
          "pct": 57850000.0
        },
        "weekly_2_4": {
          "target": 4702880.0,
          "actual": 0.08
        },
        "weekly_3_1": {
          "target": 12350000.0,
          "actual": 4296240.0,
          "pct": 0.35
        },
        "weekly_3_2": {
          "target": 12350000.0,
          "actual": 5047640.0,
          "pct": 0.41
        },
        "weekly_3_3": {
          "target": 12350000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 12350000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 68380000.0,
          "actual": 5000000.0,
          "pct": 0.07
        },
        "weekly_4_2": {
          "target": 68380000.0,
          "actual": 10029960.0,
          "pct": 0.15
        },
        "weekly_4_3": {
          "target": 68380000.0,
          "actual": 9305000.0,
          "pct": 0.14
        },
        "weekly_4_4": {
          "target": 68380000.0,
          "actual": 3889600.0,
          "pct": 0.06
        },
        "weekly_4_5": {
          "target": 68380000.0,
          "actual": 3960320.0,
          "pct": 0.06
        },
        "weekly_5_1": {
          "target": 63000000.0,
          "actual": 13700000.0,
          "pct": 0.22
        },
        "weekly_5_2": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 59880000.0,
          "actual": 5000000.0,
          "pct": 0.08
        },
        "weekly_6_2": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 59880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_3": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "VM1-I02.04": {
      "title": "",
      "unit": "Doanh thu đối tác",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.92,
          "actual": 45646774.0,
          "pct": 41096774.0
        },
        "monthly_3": {
          "target": 200200000.0,
          "actual": 290171406.0,
          "pct": 1.45
        },
        "monthly_4": {
          "target": 330200000.0,
          "actual": 245153263.0,
          "pct": 0.74
        },
        "monthly_5": {
          "target": 338000000.0,
          "actual": 212168000.0,
          "pct": 0.63
        },
        "monthly_6": {
          "target": 338000000.0,
          "actual": 349426721.0,
          "pct": 1.03
        },
        "monthly_7": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1228090936.0,
          "actual": 2843725.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1014000000.0,
          "actual": 363636960.0,
          "pct": 0.36
        },
        "quarterly_2": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 45646774.0,
          "actual": 41859499.0,
          "pct": 0.92
        },
        "weekly_1_2": {
          "target": 45646774.0,
          "actual": 42177774.0,
          "pct": 0.92
        },
        "weekly_1_4": {
          "target": 0.9
        },
        "weekly_1_5": {
          "pct": 474200000.0
        },
        "weekly_1_6": {
          "target": 48600068.0,
          "actual": 0.1,
          "pct": 4550000.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 43550000.0
        },
        "weekly_2_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 4550000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 4550000.0,
          "actual": 11000000.0,
          "pct": 2.42
        },
        "weekly_3_3": {
          "target": 4550000.0,
          "actual": 11000000.0,
          "pct": 2.42
        },
        "weekly_3_4": {
          "target": 4550000.0,
          "actual": 18000000.0,
          "pct": 3.96
        },
        "weekly_3_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 33640000.0,
          "actual": 15000000.0,
          "pct": 0.45
        },
        "weekly_4_2": {
          "target": 33640000.0,
          "actual": 15000000.0,
          "pct": 0.45
        },
        "weekly_4_3": {
          "target": 33640000.0,
          "actual": 25000000.0,
          "pct": 0.74
        },
        "weekly_4_4": {
          "target": 33640000.0,
          "actual": 25000000.0,
          "pct": 0.74
        },
        "weekly_4_5": {
          "target": 33640000.0,
          "actual": 25000000.0,
          "pct": 0.74
        },
        "weekly_5_1": {
          "target": 56500000.0,
          "actual": 15000000.0,
          "pct": 0.27
        },
        "weekly_5_2": {
          "target": 53640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 3640000.0,
          "actual": 15000000.0,
          "pct": 4.12
        },
        "weekly_6_2": {
          "target": 53640000.0,
          "actual": 25000000.0,
          "pct": 0.47
        },
        "weekly_6_3": {
          "target": 53640000.0,
          "actual": 30000000.0,
          "pct": 0.56
        },
        "weekly_6_4": {
          "target": 53640000.0,
          "actual": 30000000.0,
          "pct": 0.56
        },
        "weekly_7_1": {
          "target": 5200000.0,
          "actual": 23000000.0,
          "pct": 4.42
        },
        "weekly_7_2": {
          "target": 5200000.0,
          "actual": 35000000.0,
          "pct": 6.73
        },
        "weekly_7_3": {
          "target": 5200000.0,
          "actual": 38000000.0,
          "pct": 7.31
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.02": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "",
      "unit": "CP Mua mới công cụ AI",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 42000000.0,
          "actual": 0.0
        }
      }
    },
    "VM1-I05.04": {
      "title": "",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 153200000.0,
          "actual": 0.0
        }
      }
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 2.0671
        },
        "monthly_4": {
          "pct": 1.6429
        },
        "monthly_5": {
          "pct": 0.3201
        },
        "weekly_1_5": {
          "actual": 0.2
        },
        "weekly_1_6": {
          "actual": 2.1543
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Nội dung",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 211.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 28.0,
          "pct": 27.0
        },
        "monthly_3": {
          "target": 106.0,
          "actual": 108.0,
          "pct": 1.02
        },
        "monthly_4": {
          "target": 107.0,
          "actual": 112.0,
          "pct": 1.05
        },
        "monthly_5": {
          "target": 107.0,
          "actual": 104.0,
          "pct": 0.97
        },
        "monthly_6": {
          "target": 112.0,
          "actual": 108.0,
          "pct": 0.96
        },
        "monthly_7": {
          "target": 183.0,
          "actual": 20.0,
          "pct": 0.11
        },
        "yearly_2026": {
          "target": 294.0,
          "actual": 281.0,
          "pct": 0.96
        },
        "quarterly_1": {
          "target": 399.0,
          "actual": 359.0,
          "pct": 0.9
        },
        "quarterly_2": {
          "target": 339.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 20.0,
          "actual": 22.0,
          "pct": 1.1
        },
        "weekly_1_2": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 0.96
        },
        "weekly_1_5": {
          "actual": 0.6,
          "pct": 71.0
        },
        "weekly_1_6": {
          "target": 78.0,
          "actual": 1.1,
          "pct": 20.0
        },
        "weekly_2_1": {
          "target": 22.0,
          "actual": 1.1,
          "pct": 24.0
        },
        "weekly_2_2": {
          "target": 24.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 19.0
        },
        "weekly_2_4": {
          "target": 27.0,
          "actual": 1.42
        },
        "weekly_2_5": {
          "pct": 0.6
        },
        "weekly_3_1": {
          "target": 22.0,
          "actual": 21.0,
          "pct": 0.95
        },
        "weekly_3_2": {
          "target": 26.0,
          "actual": 25.0,
          "pct": 0.96
        },
        "weekly_3_3": {
          "target": 27.0,
          "actual": 28.0,
          "pct": 1.04
        },
        "weekly_3_4": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 19.0,
          "actual": 20.0,
          "pct": 1.05
        },
        "weekly_4_2": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 27.0,
          "actual": 26.0,
          "pct": 0.96
        },
        "weekly_4_4": {
          "target": 25.0,
          "actual": 30.0,
          "pct": 1.2
        },
        "weekly_4_5": {
          "target": 17.0,
          "actual": 18.0,
          "pct": 1.06
        },
        "weekly_5_1": {
          "target": 19.0,
          "actual": 18.0,
          "pct": 0.95
        },
        "weekly_5_2": {
          "target": 26.0,
          "actual": 23.0,
          "pct": 0.88
        },
        "weekly_5_3": {
          "target": 24.0,
          "actual": 25.0,
          "pct": 1.04
        },
        "weekly_5_4": {
          "target": 26.0,
          "actual": 30.0,
          "pct": 1.15
        },
        "weekly_6_1": {
          "target": 22.0,
          "actual": 22.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 27.0,
          "actual": 26.0,
          "pct": 0.96
        },
        "weekly_6_3": {
          "target": 28.0,
          "actual": 26.0,
          "pct": 0.93
        },
        "weekly_6_4": {
          "target": 28.0,
          "actual": 22.0,
          "pct": 0.79
        },
        "weekly_7_1": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 24.0,
          "actual": 25.0,
          "pct": 1.04
        },
        "weekly_7_3": {
          "target": 23.0,
          "actual": 23.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 22.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 266.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1968.0,
          "actual": 1398.0
        },
        "quarterly_2": {
          "target": 902.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 56.0,
          "actual": 39.0,
          "pct": 0.7
        },
        "weekly_7_2": {
          "target": 62.0,
          "actual": 60.0,
          "pct": 0.96
        },
        "weekly_7_3": {
          "target": 58.0,
          "actual": 58.0,
          "pct": 0.99
        },
        "weekly_7_4": {
          "target": 59.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM2-I01.3": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Ý tưởng",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0,
          "actual": 20.0,
          "pct": 0.56
        }
      }
    },
    "VM2-I01.4": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Số lượng ý tưởng được chọn",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0,
          "actual": 20.0,
          "pct": 0.56
        }
      }
    },
    "VM2-I01.5": {
      "title": "ROI",
      "unit": "Tỷ lệ chọn ý tưởng",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 0.9,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM2-I01.6": {
      "title": "SL Kịch bản mới SX",
      "unit": "Kịch bản",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 33.0,
          "actual": 11.0,
          "pct": 0.33
        }
      }
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {}
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.33
        },
        "monthly_4": {
          "target": 6.0,
          "actual": 2.0,
          "pct": 0.33
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 4.0,
          "pct": 0.8
        },
        "monthly_6": {
          "target": 6.0,
          "actual": 5.0,
          "pct": 0.83
        },
        "monthly_7": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 25.0,
          "actual": 9.0,
          "pct": 0.36
        },
        "quarterly_1": {
          "target": 23.0,
          "actual": 11.0,
          "pct": 0.48
        },
        "quarterly_2": {
          "target": 25.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 1.67,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_2_5": {
          "pct": 0.3
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.831
        },
        "monthly_4": {
          "pct": 0.709
        },
        "monthly_5": {
          "pct": 0.097
        },
        "weekly_1_5": {
          "actual": 0.15
        },
        "weekly_1_6": {
          "actual": 0.779
        },
        "weekly_2_5": {
          "pct": 0.15
        }
      }
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_2": {
          "actual": 0.406
        },
        "monthly_7": {
          "target": 1195381134.0
        },
        "weekly_1_1": {
          "target": -0.03,
          "actual": 0.347
        },
        "weekly_1_2": {
          "target": -0.156,
          "actual": 0.0862
        },
        "weekly_1_6": {
          "pct": 0.084
        },
        "weekly_2_1": {
          "target": 0.547,
          "pct": 0.8
        },
        "weekly_2_2": {
          "target": 1.5,
          "pct": 0.929
        },
        "weekly_2_3": {
          "target": 1.679,
          "pct": 0.801
        },
        "weekly_2_4": {
          "target": 1.501
        },
        "weekly_3_1": {
          "target": 0.322,
          "actual": 0.586
        },
        "weekly_3_2": {
          "target": 0.093,
          "actual": -0.114
        },
        "weekly_3_3": {
          "target": -0.031,
          "actual": -0.114
        },
        "weekly_3_4": {
          "target": -0.243,
          "actual": 0.052
        },
        "weekly_3_5": {
          "target": -0.988
        },
        "weekly_4_1": {
          "target": -0.027,
          "actual": -0.226
        },
        "weekly_4_2": {
          "target": 0.01,
          "actual": -0.117
        },
        "weekly_4_3": {
          "target": 0.03,
          "actual": 0.026
        },
        "weekly_4_4": {
          "target": -0.085,
          "actual": -0.075
        },
        "weekly_5_1": {
          "target": 0.638,
          "actual": 0.124
        },
        "weekly_5_2": {
          "target": -0.066,
          "actual": 0.04
        },
        "weekly_5_3": {
          "target": -0.272,
          "actual": -0.265
        },
        "weekly_5_4": {
          "target": -0.013,
          "actual": -0.207
        },
        "weekly_6_1": {
          "target": 0.129,
          "actual": -0.24
        },
        "weekly_6_2": {
          "target": 0.073,
          "actual": -0.13
        },
        "weekly_6_3": {
          "target": 0.085,
          "actual": 0.3
        },
        "weekly_6_4": {
          "target": 0.357,
          "actual": 0.78
        },
        "weekly_7_1": {
          "target": 0.162,
          "actual": 0.84
        },
        "weekly_7_2": {
          "target": 0.307,
          "actual": 1.24
        },
        "weekly_7_3": {
          "target": 0.044,
          "actual": 1.15
        },
        "weekly_7_4": {
          "target": -1.0,
          "actual": -1.0
        }
      }
    },
    "TM3-I01.02": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Views",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 188578088.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.93,
          "actual": 107274251.0,
          "pct": 92033353.0
        },
        "monthly_3": {
          "target": 668104850.0,
          "actual": 555248145.0,
          "pct": 0.83
        },
        "monthly_4": {
          "target": 710805300.0,
          "actual": 503688565.0,
          "pct": 0.71
        },
        "monthly_5": {
          "target": 756985200.0,
          "actual": 488851744.0,
          "pct": 0.65
        },
        "monthly_6": {
          "target": 754018683.0,
          "actual": 435016280.0,
          "pct": 0.58
        },
        "monthly_7": {
          "target": 1211181134.0,
          "actual": 702759628.0,
          "pct": 0.58
        },
        "yearly_2026": {
          "target": 1647417664.0,
          "actual": 1525262630.0,
          "pct": 0.93
        },
        "quarterly_1": {
          "target": 2470274934.0,
          "actual": 1549213399.0,
          "pct": 0.63
        },
        "quarterly_2": {
          "target": 2289190389.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 108466453.0,
          "actual": 64464734.0,
          "pct": 0.59
        },
        "weekly_1_2": {
          "target": 69933212.0,
          "actual": 54427005.0,
          "pct": 0.78
        },
        "weekly_1_4": {
          "target": 0.86
        },
        "weekly_1_5": {
          "actual": 1.0,
          "pct": 594670100.0
        },
        "weekly_1_6": {
          "target": 463455682.0,
          "actual": 0.78,
          "pct": 148771692.0
        },
        "weekly_2_1": {
          "target": 99748657.0,
          "actual": 0.67,
          "pct": 147014309.0
        },
        "weekly_2_2": {
          "target": 119617902.0,
          "actual": 0.81,
          "pct": 147321760.0
        },
        "weekly_2_3": {
          "target": 128202333.0,
          "actual": 0.87,
          "pct": 148289983.0
        },
        "weekly_2_4": {
          "target": 119664475.0,
          "actual": 0.81
        },
        "weekly_2_5": {
          "pct": 1.0
        },
        "weekly_3_1": {
          "target": 166305928.0,
          "actual": 158199863.0,
          "pct": 0.95
        },
        "weekly_3_2": {
          "target": 163864603.0,
          "actual": 140094330.0,
          "pct": 0.85
        },
        "weekly_3_3": {
          "target": 164513886.0,
          "actual": 124188828.0,
          "pct": 0.75
        },
        "weekly_3_4": {
          "target": 164828462.0,
          "actual": 125895827.0,
          "pct": 0.76
        },
        "weekly_3_5": {
          "target": 142326969.0,
          "actual": 1968485.0,
          "pct": 0.01
        },
        "weekly_4_1": {
          "target": 166712080.0,
          "actual": 122471826.0,
          "pct": 0.73
        },
        "weekly_4_2": {
          "target": 167164570.0,
          "actual": 123659443.0,
          "pct": 0.74
        },
        "weekly_4_3": {
          "target": 165553293.0,
          "actual": 127392444.0,
          "pct": 0.77
        },
        "weekly_4_4": {
          "target": 165142578.0,
          "actual": 116511450.0,
          "pct": 0.71
        },
        "weekly_4_5": {
          "target": 163872763.0,
          "actual": 84015038.0,
          "pct": 0.51
        },
        "weekly_5_1": {
          "target": 189108800.0,
          "actual": 137599600.0,
          "pct": 0.73
        },
        "weekly_5_2": {
          "target": 189108800.0,
          "actual": 128572307.0,
          "pct": 0.68
        },
        "weekly_5_3": {
          "target": 189108800.0,
          "actual": 93576369.0,
          "pct": 0.49
        },
        "weekly_5_4": {
          "target": 189108800.0,
          "actual": 92369360.0,
          "pct": 0.49
        },
        "weekly_6_1": {
          "target": 188504672.0,
          "actual": 104261050.0,
          "pct": 0.55
        },
        "weekly_6_2": {
          "target": 188504672.0,
          "actual": 111845819.0,
          "pct": 0.59
        },
        "weekly_6_3": {
          "target": 188504672.0,
          "actual": 121337448.0,
          "pct": 0.64
        },
        "weekly_6_4": {
          "target": 345778173.0,
          "actual": 164609077.0,
          "pct": 0.48
        },
        "weekly_7_1": {
          "target": 277807583.0,
          "actual": 191357805.0,
          "pct": 0.69
        },
        "weekly_7_2": {
          "target": 284049967.0,
          "actual": 250137877.0,
          "pct": 0.88
        },
        "weekly_7_3": {
          "target": 284199967.0,
          "actual": 261263947.0,
          "pct": 0.92
        },
        "weekly_7_4": {
          "target": 284449967.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "TM3-I01.03": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video upload",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 93.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 12.0,
          "pct": 12.0
        },
        "monthly_3": {
          "target": 95.0,
          "actual": 95.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 92.0,
          "actual": 92.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 105.0,
          "actual": 123.0,
          "pct": 1.17
        },
        "monthly_6": {
          "target": 105.0,
          "actual": 104.0,
          "pct": 0.99
        },
        "monthly_7": {
          "target": 165.0,
          "actual": 3.0,
          "pct": 0.02
        },
        "yearly_2026": {
          "target": 1856.0,
          "actual": 1761.0,
          "pct": 0.95
        },
        "quarterly_1": {
          "target": 307.0,
          "actual": 319.0,
          "pct": 1.04
        },
        "quarterly_2": {
          "target": 288.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 17.0,
          "actual": 17.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 17.0,
          "actual": 17.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 88.0
        },
        "weekly_1_6": {
          "target": 87.0,
          "actual": 0.99,
          "pct": 11.0
        },
        "weekly_2_1": {
          "target": 11.0,
          "actual": 1.0,
          "pct": 13.0
        },
        "weekly_2_2": {
          "target": 13.0,
          "actual": 1.0,
          "pct": 16.0
        },
        "weekly_2_3": {
          "target": 16.0,
          "actual": 1.0,
          "pct": 15.0
        },
        "weekly_2_4": {
          "target": 14.0,
          "actual": 0.93
        },
        "weekly_2_5": {
          "pct": 0.1
        },
        "weekly_3_1": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 14.0,
          "actual": 14.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 8.0,
          "actual": 1.0,
          "pct": 0.13
        },
        "weekly_4_1": {
          "target": 22.0,
          "actual": 15.0,
          "pct": 0.68
        },
        "weekly_4_2": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 15.0,
          "actual": 14.0,
          "pct": 0.93
        },
        "weekly_5_1": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 16.0,
          "actual": 18.0,
          "pct": 1.13
        },
        "weekly_6_1": {
          "target": 19.0,
          "actual": 20.0,
          "pct": 1.05
        },
        "weekly_6_2": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 20.0,
          "actual": 20.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 21.0,
          "actual": 16.0,
          "pct": 0.76
        },
        "weekly_7_1": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 20.0,
          "actual": 16.0,
          "pct": 0.8
        },
        "weekly_7_3": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 16.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM3-I01.04": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM3-I01.05": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.5379
        },
        "monthly_4": {
          "pct": 0.5001
        },
        "monthly_5": {
          "pct": 0.0795
        },
        "monthly_6": {
          "pct": 0.0328
        },
        "monthly_7": {
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.15
        },
        "weekly_1_6": {
          "actual": 0.6598
        },
        "weekly_2_5": {
          "pct": 0.15
        }
      }
    },
    "TM4-I01.01": {
      "title": "Độ phủ thương hiệu",
      "unit": "Lượt tiếp cận",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 400000.0,
          "actual": 289381.0,
          "pct": 0.7235
        },
        "monthly_4": {
          "target": 400000.0,
          "actual": 250000.0,
          "pct": 0.625
        },
        "monthly_5": {
          "target": 400000.0,
          "actual": 260000.0,
          "pct": 0.65
        },
        "monthly_6": {
          "target": 350000.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 250000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1875000.0,
          "actual": 842523.0,
          "pct": 0.4493
        },
        "quarterly_1": {
          "target": 1500000.0,
          "actual": 600000.0,
          "pct": 0.4
        },
        "quarterly_2": {
          "target": 1000000.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.25,
          "pct": 323735.0
        },
        "weekly_1_6": {
          "target": 283363.0,
          "actual": 0.8753
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Kênh",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 5.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.1
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 23.0,
          "actual": 14.0,
          "pct": 0.61
        },
        "monthly_4": {
          "target": 16.0,
          "actual": 9.0,
          "pct": 0.56
        },
        "monthly_5": {
          "target": 16.0,
          "actual": 10.0,
          "pct": 0.63
        },
        "monthly_6": {
          "target": 16.0,
          "actual": 10.0,
          "pct": 0.63
        },
        "monthly_7": {
          "target": 16.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 24.0,
          "actual": 18.0,
          "pct": 0.75
        },
        "quarterly_1": {
          "target": 23.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 18.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.35,
          "pct": 21.0
        },
        "weekly_1_6": {
          "target": 18.0,
          "actual": 0.86
        },
        "weekly_2_5": {
          "pct": 0.35
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.95,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 0.96,
          "pct": 0.96
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 0.98,
          "pct": 0.98
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.99,
          "pct": 0.99
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 0.95,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 0.98,
          "pct": 1.03
        },
        "quarterly_2": {
          "target": 0.95,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.15,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 0.94,
          "actual": 0.94
        },
        "weekly_2_5": {
          "pct": 0.15
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "ROI = (Tổng doanh thu - tổng chi phí)/Tổng chi phí",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 2.0,
          "actual": 4.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 20.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 8.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.15,
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.15
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 69.0,
          "actual": 23.0,
          "pct": 0.33
        }
      }
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 72.0,
          "actual": 23.0,
          "pct": 0.32
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.846
        },
        "monthly_4": {
          "pct": 0.696
        },
        "monthly_5": {
          "pct": 0.076
        },
        "yearly_2026": {
          "pct": 0.9709
        },
        "weekly_1_5": {
          "actual": 0.1
        },
        "weekly_1_6": {
          "actual": 0.901
        },
        "weekly_2_5": {
          "pct": 0.1
        }
      }
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 4.0,
          "actual": 3.0,
          "pct": 0.75
        },
        "quarterly_1": {
          "target": 3.0
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 14.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 45.0,
          "actual": 44.5,
          "pct": 0.99
        },
        "monthly_4": {
          "target": 43.8,
          "actual": 42.8,
          "pct": 0.98
        },
        "monthly_5": {
          "target": 35.5,
          "actual": 41.0,
          "pct": 1.15
        },
        "monthly_6": {
          "target": 41.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 17.5
        },
        "yearly_2026": {
          "target": 43.5,
          "actual": 46.0,
          "pct": 1.07
        },
        "quarterly_1": {
          "target": 43.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 20.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 44.7
        },
        "weekly_1_6": {
          "target": 45.0,
          "actual": 1.01
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 3.5,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 8.0,
          "actual": 8.2,
          "pct": 0.99
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 0.86
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 0.9
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 4.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 18.0,
          "actual": 20.7,
          "pct": 1.18
        },
        "quarterly_1": {
          "target": 20.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 6.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.25,
          "pct": 8.0
        },
        "weekly_1_6": {
          "target": 7.7,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "Số NDSX/ số nhân sự sx (ko tính quản lý BP/DA)": {
      "title": "Hiệu suất sản xuất",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 589422860.1,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 258847634.0,
          "actual": 221739497.0,
          "pct": 0.86
        },
        "monthly_4": {
          "target": 286591217.0,
          "actual": 203374817.0,
          "pct": 0.71
        },
        "monthly_5": {
          "target": 297307965.0,
          "actual": 204581138.0,
          "pct": 0.69
        },
        "monthly_6": {
          "target": 304571699.0,
          "actual": 483477254334.0,
          "pct": 1587.4
        },
        "monthly_7": {
          "target": 70374949.0,
          "actual": 51315362.0,
          "pct": 0.73
        },
        "yearly_2026": {
          "target": 627468151.0,
          "actual": 505647033.0,
          "pct": 0.81
        },
        "quarterly_1": {
          "target": 755744054.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 799412653.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.25,
          "pct": 247774169.0
        },
        "weekly_1_6": {
          "target": 247308442.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2779417161.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1097878508.0,
          "actual": 820767689.0,
          "pct": 0.75
        },
        "monthly_4": {
          "target": 1230251212.0,
          "actual": 529001483.2,
          "pct": 0.43
        },
        "monthly_5": {
          "target": 1294151352.0,
          "actual": 493591306.3,
          "pct": 0.38
        },
        "monthly_6": {
          "target": 1332439035.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 280619276.0
        },
        "yearly_2026": {
          "target": 586476404.0,
          "actual": 525013255.0,
          "pct": 0.9
        },
        "quarterly_1": {
          "target": 2700737193.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 3054859473.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.25,
          "pct": 1031403351.0
        },
        "weekly_1_6": {
          "target": 830167980.0,
          "actual": 0.8
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "Số lượng đầu mục công việc/ quy trình được số hóa": {
      "title": "ROI",
      "unit": "Mức độ ứng dụng AI trong sản xuất SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 1.038
        },
        "monthly_4": {
          "pct": 1.5
        },
        "monthly_5": {
          "pct": 0.07
        },
        "monthly_6": {
          "pct": 0.0
        },
        "monthly_7": {
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.052
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 18.0,
          "actual": 18.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 14.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.5,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.5
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.88,
          "actual": 0.95,
          "pct": 1.08
        },
        "monthly_4": {
          "target": 0.83,
          "actual": 0.95,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.83,
          "actual": 0.95,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.75,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.83,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.83,
          "actual": 1.0,
          "pct": 1.21
        },
        "quarterly_1": {
          "target": 0.83,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 0.97,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.5,
          "pct": 0.92
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.09
        },
        "weekly_2_5": {
          "pct": 0.5
        }
      }
    },
    "VM6-I02": {
      "title": "",
      "unit": "Số lượng nhân sự fulltime",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 122.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.96,
          "pct": 0.9589
        },
        "quarterly_1": {
          "target": 1.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.1
        },
        "monthly_5": {
          "target": 0.1,
          "actual": 0.07,
          "pct": 0.6849
        },
        "quarterly_1": {
          "target": 0.1
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.949
        },
        "monthly_4": {
          "pct": 0.878
        },
        "monthly_5": {
          "pct": 0.048
        },
        "monthly_6": {
          "pct": 0.035
        },
        "monthly_7": {
          "pct": 0.034
        },
        "yearly_2026": {
          "pct": 0.7689
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.841
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.2,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.3,
          "actual": 0.25,
          "pct": 0.83
        },
        "quarterly_1": {
          "target": 0.23,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 0.3,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.2
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "TM7-I02": {
      "title": "ROI",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.1,
          "actual": 0.1,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.1,
          "actual": 0.1,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.1,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.2,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.17,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 0.17,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.1
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 0.25
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 0.01,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.9,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.94,
          "actual": 0.95,
          "pct": 1.01
        },
        "monthly_4": {
          "target": 0.94,
          "actual": 0.97,
          "pct": 1.03
        },
        "monthly_5": {
          "target": 0.94,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.94,
          "actual": 0.98,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.94,
          "actual": 0.9,
          "pct": 0.96
        },
        "yearly_2026": {
          "target": 0.89,
          "actual": 0.94,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 3.55,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 2.7,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.7,
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.96,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.7
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 16.0,
          "actual": 6.0,
          "pct": 0.8
        },
        "monthly_4": {
          "target": 11.0,
          "actual": 21.0,
          "pct": 0.52
        },
        "monthly_5": {
          "target": 10.0,
          "actual": 12.0,
          "pct": 0.83
        },
        "monthly_6": {
          "target": 9.0,
          "actual": 19.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 9.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 38.0,
          "actual": 71.0,
          "pct": 0.54
        },
        "quarterly_1": {
          "target": 37.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 27.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 15.0
        },
        "weekly_1_6": {
          "target": 32.0,
          "actual": 0.47
        },
        "weekly_2_5": {
          "pct": 0.3
        }
      }
    }
  },
  "Wofloo": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "quarterly_1": {
          "actual": 0.3894
        },
        "weekly_1_1": {
          "target": 0.8438
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "quarterly_1": {
          "actual": 0.2803
        },
        "weekly_1_1": {
          "target": 1174912032.0
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "2.1": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.52,
          "actual": 569072434.0,
          "pct": 432342507.0
        },
        "monthly_3": {
          "target": 2818516751.0,
          "actual": 1627530603.0,
          "pct": 0.58
        },
        "monthly_4": {
          "target": 2973441148.0,
          "actual": 1243129031.0,
          "pct": 0.42
        },
        "monthly_5": {
          "target": 3181579568.0,
          "actual": 1528460287.0,
          "pct": 0.48
        },
        "monthly_6": {
          "target": 3268238272.0,
          "actual": 1510333391.0,
          "pct": 0.46
        },
        "monthly_7": {
          "target": 2522696922.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 7823272911.0,
          "actual": 4170104048.0,
          "pct": 0.53
        },
        "quarterly_1": {
          "target": 9360202176.0,
          "actual": 4545054253.0,
          "pct": 0.4856
        },
        "quarterly_2": {
          "target": 7866985311.0
        },
        "weekly_1_1": {
          "target": 569072434.0,
          "actual": 246034466.0,
          "pct": 0.43
        },
        "weekly_1_2": {
          "target": 569072434.0,
          "actual": 235413253.0,
          "pct": 0.41
        },
        "weekly_1_4": {
          "target": 0.76
        },
        "weekly_1_5": {
          "pct": 2461566873.0
        },
        "weekly_1_6": {
          "target": 1384834132.0,
          "actual": 0.56,
          "pct": 582031450.0
        },
        "weekly_2_1": {
          "target": 249422628.0,
          "actual": 0.43,
          "pct": 536531450.0
        },
        "weekly_2_2": {
          "target": 286209200.0,
          "actual": 0.53,
          "pct": 536531450.0
        },
        "weekly_2_3": {
          "target": 337356641.0,
          "actual": 0.63,
          "pct": 536531450.0
        },
        "weekly_2_4": {
          "target": 280402033.0,
          "actual": 0.52
        },
        "weekly_3_1": {
          "target": 613742298.0,
          "actual": 299232255.0,
          "pct": 0.49
        },
        "weekly_3_2": {
          "target": 613742298.0,
          "actual": 279599066.0,
          "pct": 0.46
        },
        "weekly_3_3": {
          "target": 613742298.0,
          "actual": 269340823.0,
          "pct": 0.44
        },
        "weekly_3_4": {
          "target": 613742298.0,
          "actual": 286599066.0,
          "pct": 0.47
        },
        "weekly_3_5": {
          "target": 613742298.0
        },
        "weekly_4_1": {
          "target": 695360287.0,
          "actual": 266920630.0,
          "pct": 0.38
        },
        "weekly_4_2": {
          "target": 695360287.0,
          "actual": 241600464.0,
          "pct": 0.35
        },
        "weekly_4_3": {
          "target": 695360287.0,
          "actual": 265132260.0,
          "pct": 0.38
        },
        "weekly_4_4": {
          "target": 695360287.0,
          "actual": 250665518.0,
          "pct": 0.36
        },
        "weekly_4_5": {
          "target": 695360287.0,
          "actual": 250665518.0,
          "pct": 0.36
        },
        "weekly_5_1": {
          "target": 706869487.0,
          "actual": 287634971.0,
          "pct": 0.41
        },
        "weekly_5_2": {
          "target": 706869487.0,
          "actual": 298992667.0,
          "pct": 0.42
        },
        "weekly_5_3": {
          "target": 706869487.0,
          "actual": 299463066.0,
          "pct": 0.42
        },
        "weekly_5_4": {
          "target": 706869487.0,
          "actual": 299463066.0
        },
        "weekly_6_1": {
          "target": 727309568.0,
          "actual": 303795007.0,
          "pct": 0.42
        },
        "weekly_6_2": {
          "target": 777309568.0,
          "actual": 342392833.0,
          "pct": 0.44
        },
        "weekly_6_3": {
          "target": 727309568.0,
          "actual": 360307892.0,
          "pct": 0.5
        },
        "weekly_6_4": {
          "target": 727309568.0,
          "actual": 350294092.0,
          "pct": 0.48
        },
        "weekly_7_1": {
          "target": 560599316.0,
          "actual": 292061814.0,
          "pct": 0.52
        },
        "weekly_7_2": {
          "target": 560599316.0,
          "actual": 307218604.0,
          "pct": 0.55
        },
        "weekly_7_3": {
          "target": 560599316.0,
          "actual": 337940465.0,
          "pct": 0.6
        },
        "weekly_7_4": {
          "target": 560599316.0
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu nội bộ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.45,
          "actual": 498620821.0,
          "pct": 361890894.0
        },
        "monthly_3": {
          "target": 2454969192.0,
          "actual": 1229910774.0,
          "pct": 0.5
        },
        "monthly_4": {
          "target": 2427441148.0,
          "actual": 1243129031.0,
          "pct": 0.51
        },
        "monthly_5": {
          "target": 2600869232.0,
          "actual": 1528460287.0,
          "pct": 0.59
        },
        "monthly_6": {
          "target": 2709238272.0,
          "actual": 1085848004.0
        },
        "yearly_2026": {
          "target": 5984803778.0,
          "actual": 3514051064.0,
          "pct": 0.59
        },
        "quarterly_1": {
          "target": 7737548652.0,
          "actual": 3284403010.0
        },
        "weekly_1_1": {
          "target": 498620821.0,
          "actual": 175582853.0,
          "pct": 0.35
        },
        "weekly_1_2": {
          "target": 498620821.0,
          "actual": 164961640.0,
          "pct": 0.33
        },
        "weekly_1_4": {
          "target": 0.73
        },
        "weekly_1_5": {
          "pct": 2146125800.0
        },
        "weekly_1_6": {
          "target": 1292739113.0,
          "actual": 0.6,
          "pct": 536531450.0
        },
        "weekly_2_1": {
          "target": 240322628.0,
          "actual": 0.45,
          "pct": 536531450.0
        },
        "weekly_2_2": {
          "target": 286209200.0,
          "actual": 0.53,
          "pct": 536531450.0
        },
        "weekly_2_3": {
          "target": 337356641.0,
          "actual": 0.63,
          "pct": 536531450.0
        },
        "weekly_2_4": {
          "target": 280402033.0,
          "actual": 0.52
        },
        "weekly_3_1": {
          "target": 613742298.0,
          "actual": 299232255.0,
          "pct": 0.49
        },
        "weekly_3_2": {
          "target": 613742298.0,
          "actual": 268599066.0,
          "pct": 0.44
        },
        "weekly_3_3": {
          "target": 613742298.0,
          "actual": 258340823.0,
          "pct": 0.42
        },
        "weekly_3_4": {
          "target": 613742298.0,
          "actual": 268599066.0,
          "pct": 0.44
        },
        "weekly_3_5": {
          "target": 613742298.0
        },
        "weekly_4_1": {
          "target": 606860287.0,
          "actual": 246920630.0,
          "pct": 0.41
        },
        "weekly_4_2": {
          "target": 606860287.0,
          "actual": 221600464.0,
          "pct": 0.37
        },
        "weekly_4_3": {
          "target": 606860287.0,
          "actual": 240132260.0,
          "pct": 0.4
        },
        "weekly_4_4": {
          "target": 606860287.0,
          "actual": 225665518.0,
          "pct": 0.37
        },
        "weekly_4_5": {
          "target": 606860287.0,
          "actual": 225665518.0,
          "pct": 0.37
        },
        "weekly_5_1": {
          "target": 606869487.0,
          "actual": 262634971.0,
          "pct": 0.43
        },
        "weekly_5_2": {
          "target": 606869487.0
        },
        "weekly_5_3": {
          "target": 606869487.0
        },
        "weekly_5_4": {
          "target": 606869487.0
        },
        "weekly_6_1": {
          "target": 677309568.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 677309568.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 677309568.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 677309568.0,
          "pct": 0.0
        }
      }
    },
    "2.2": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.73,
          "actual": 10612903.0,
          "pct": 9057033.0
        },
        "monthly_3": {
          "target": 55000000.0,
          "pct": 0.87,
          "actual": 47684367.0
        },
        "monthly_4": {
          "target": 80000000.0,
          "actual": 46101533.0,
          "pct": 0.58
        },
        "monthly_5": {
          "target": 80000000.0,
          "actual": 53738213.0,
          "pct": 0.67
        },
        "monthly_6": {
          "target": 90000000.0,
          "actual": 42490828.0,
          "pct": 0.47
        },
        "yearly_2026": {
          "target": 204413000.0,
          "pct": 0.6,
          "actual": 122164814.0
        },
        "weekly_1_1": {
          "target": 10612903.0,
          "actual": 6229749.0,
          "pct": 0.59
        },
        "weekly_1_2": {
          "target": 10612903.0,
          "actual": 6013315.0,
          "pct": 0.57
        },
        "weekly_1_4": {
          "target": 0.85
        },
        "weekly_1_5": {
          "pct": 51700000.0
        },
        "weekly_1_6": {
          "actual": 0.81,
          "pct": 12925000.0,
          "target": 41728481.0
        },
        "weekly_2_1": {
          "target": 8221211.0,
          "actual": 0.64,
          "pct": 12925000.0
        },
        "weekly_2_2": {
          "target": 10966076.0,
          "actual": 0.85,
          "pct": 12925000.0
        },
        "weekly_2_3": {
          "target": 14015558.0,
          "actual": 1.08,
          "pct": 12925000.0
        },
        "weekly_2_4": {
          "target": 9249173.0,
          "actual": 0.72
        },
        "weekly_3_1": {
          "target": 13750000.0,
          "actual": 11659434.0,
          "pct": 0.85
        },
        "weekly_3_2": {
          "target": 13750000.0,
          "actual": 9145923.0,
          "pct": 0.67
        },
        "weekly_3_3": {
          "target": 13750000.0,
          "actual": 8495564.0,
          "pct": 0.62
        },
        "weekly_3_4": {
          "target": 13750000.0,
          "actual": 12154782.0,
          "pct": 0.88
        },
        "weekly_3_5": {
          "target": 13750000.0
        },
        "weekly_4_1": {
          "target": 18666667.0,
          "actual": 13359950.0,
          "pct": 0.72
        },
        "weekly_4_2": {
          "target": 18666667.0,
          "actual": 12073806.0,
          "pct": 0.65
        },
        "weekly_4_3": {
          "target": 18666667.0,
          "actual": 11302268.0,
          "pct": 0.61
        },
        "weekly_4_4": {
          "target": 18666667.0,
          "actual": 9948724.0,
          "pct": 0.53
        },
        "weekly_4_5": {
          "target": 18666667.0,
          "actual": 142169835.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 20000000.0,
          "actual": 13746111.0,
          "pct": 0.69
        },
        "weekly_5_2": {
          "target": 20000000.0,
          "actual": 12500037.0,
          "pct": 0.63
        },
        "weekly_5_3": {
          "target": 20000000.0,
          "actual": 12432869.0,
          "pct": 0.62
        },
        "weekly_5_4": {
          "target": 20000000.0,
          "actual": 10640979.0
        },
        "weekly_6_1": {
          "target": 22500000.0,
          "actual": 9837417.0,
          "pct": 0.44
        },
        "weekly_6_2": {
          "target": 22500000.0,
          "actual": 11211084.0,
          "pct": 0.5
        },
        "weekly_6_3": {
          "target": 22500000.0,
          "actual": 10480071.0,
          "pct": 0.47
        },
        "weekly_6_4": {
          "target": 22500000.0,
          "actual": 9389452.0,
          "pct": 0.42
        },
        "monthly_7": {
          "target": 90000000.0
        },
        "quarterly_1": {
          "target": 250000000.0,
          "actual": 161638691.0,
          "pct": 0.65
        },
        "quarterly_2": {
          "target": 220000000.0
        },
        "weekly_7_1": {
          "target": 22500000.0,
          "actual": 7932484.0,
          "pct": 0.35
        },
        "weekly_7_2": {
          "target": 22500000.0,
          "actual": 9711264.0,
          "pct": 0.43
        },
        "weekly_7_3": {
          "target": 22500000.0,
          "actual": 9448554.0,
          "pct": 0.42
        },
        "weekly_7_4": {
          "target": 22500000.0
        }
      }
    },
    "WF01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 5000000.0,
          "pct": 0.07,
          "actual": 359566.0
        },
        "monthly_4": {
          "target": 10000000.0,
          "actual": 80387.0,
          "pct": 0.01
        },
        "monthly_5": {
          "target": 10000000.0,
          "actual": 43970.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 10000000.0,
          "actual": 4392335.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 12445999.0,
          "pct": 0.06,
          "actual": 701395.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_4": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 5000000.0
        },
        "weekly_1_6": {
          "target": 341829.0,
          "actual": 0.07,
          "pct": 1250000.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1250000.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1250000.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1250000.0
        },
        "weekly_2_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 1250000.0,
          "actual": 210550.0,
          "pct": 0.17
        },
        "weekly_3_2": {
          "target": 1250000.0,
          "actual": 115265.0,
          "pct": 0.09
        },
        "weekly_3_3": {
          "target": 1250000.0,
          "actual": 9917.0,
          "pct": 0.01
        },
        "weekly_3_4": {
          "target": 1250000.0,
          "actual": 18031.0,
          "pct": 0.01
        },
        "weekly_3_5": {
          "target": 1250000.0
        },
        "weekly_4_1": {
          "target": 2333333.0,
          "actual": 14830.0,
          "pct": 0.01
        },
        "weekly_4_2": {
          "target": 2333333.0,
          "actual": 13317.0,
          "pct": 0.01
        },
        "weekly_4_3": {
          "target": 2333333.0,
          "actual": 26116.0,
          "pct": 0.01
        },
        "weekly_4_4": {
          "target": 2333333.0,
          "actual": 20750.0,
          "pct": 0.01
        },
        "weekly_4_5": {
          "target": 2333333.0,
          "actual": 142079.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 2500000.0,
          "actual": 20892.0,
          "pct": 0.01
        },
        "weekly_5_2": {
          "target": 2500000.0,
          "actual": 10735.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 2500000.0,
          "actual": 8088.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 2500000.0,
          "actual": 10735.0
        },
        "weekly_6_1": {
          "target": 2500000.0,
          "actual": 13366.0,
          "pct": 0.01
        },
        "weekly_6_2": {
          "target": 2500000.0,
          "actual": 278368.0,
          "pct": 0.11
        },
        "weekly_6_3": {
          "target": 2500000.0,
          "actual": 250294.0,
          "pct": 0.1
        },
        "weekly_6_4": {
          "target": 2500000.0,
          "actual": 465156.0,
          "pct": 0.19
        },
        "monthly_7": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 55000000.0,
          "actual": 174923.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0
        },
        "weekly_7_3": {
          "target": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "DA3D": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 8219355.0,
          "pct": 8219355.0
        },
        "monthly_3": {
          "target": 36400000.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 62400000.0,
          "actual": 380957952.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 62400000.0,
          "actual": 476761708.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 62400000.0,
          "actual": 61818486.0
        },
        "yearly_2026": {
          "target": 132995640.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 8219355.0,
          "actual": 8219355.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 8219355.0,
          "actual": 8219355.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 32000000.0
        },
        "weekly_1_6": {
          "actual": 0.0,
          "pct": 8000000.0,
          "target": 0.0
        },
        "weekly_2_1": {
          "target": 8000000.0,
          "actual": 1.0,
          "pct": 8000000.0
        },
        "weekly_2_2": {
          "target": 8000000.0,
          "actual": 1.0,
          "pct": 8000000.0
        },
        "weekly_2_3": {
          "target": 8000000.0,
          "actual": 1.0,
          "pct": 8000000.0
        },
        "weekly_2_4": {
          "target": 8000000.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 9100000.0,
          "actual": 133345733.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 9100000.0,
          "actual": 110560211.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 9100000.0,
          "actual": 97514989.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 9100000.0,
          "actual": 110551187.0,
          "pct": 0.48
        },
        "weekly_3_5": {
          "target": 9100000.0
        },
        "weekly_4_1": {
          "target": 33800000.0,
          "actual": 87186451.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 33800000.0,
          "actual": 78727222.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 33800000.0,
          "actual": 87008545.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 33800000.0,
          "actual": 83353604.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 33800000.0,
          "actual": 83353604.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 221152687.0,
          "actual": 92809695.0,
          "pct": 0.42
        },
        "weekly_5_2": {
          "target": 221152687.0
        },
        "weekly_5_3": {
          "target": 221152687.0
        },
        "weekly_5_4": {
          "target": 221152687.0
        },
        "weekly_6_1": {
          "target": 258157068.0
        },
        "weekly_6_2": {
          "target": 258157068.0
        },
        "weekly_6_3": {
          "target": 258157068.0
        },
        "weekly_6_4": {
          "target": 258157068.0
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu chéo",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 29354839.0,
          "pct": 29354839.0
        },
        "monthly_3": {
          "target": 182000000.0,
          "actual": 107448423.0,
          "pct": 0.59
        },
        "monthly_4": {
          "target": 234000000.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 234000000.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 247000000.0,
          "actual": 101500128.0
        },
        "yearly_2026": {
          "target": 664978198.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 715000000.0,
          "actual": 101500128.0
        },
        "weekly_1_1": {
          "target": 29354839.0,
          "actual": 29354839.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 29354839.0,
          "actual": 29354839.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 182000000.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 45500000.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 45500000.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 45500000.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 45500000.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0
        },
        "weekly_3_2": {
          "target": 0.0
        },
        "weekly_3_3": {
          "target": 0.0
        },
        "weekly_3_4": {
          "target": 0.0
        },
        "weekly_3_5": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 58500000.0,
          "actual": 5000000.0,
          "pct": 0.09
        },
        "weekly_4_2": {
          "target": 58500000.0,
          "actual": 5000000.0
        },
        "weekly_4_3": {
          "target": 58500000.0
        },
        "weekly_4_4": {
          "target": 58500000.0
        },
        "weekly_4_5": {
          "target": 58500000.0
        },
        "weekly_5_1": {
          "target": 50000000.0,
          "actual": 10000000.0,
          "pct": 0.2
        },
        "weekly_5_2": {
          "target": 50000000.0
        },
        "weekly_5_3": {
          "target": 50000000.0
        },
        "weekly_5_4": {
          "target": 50000000.0
        },
        "weekly_6_1": {
          "target": 50000000.0,
          "actual": 5000000.0,
          "pct": 0.1
        },
        "weekly_6_2": {
          "target": 50000000.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 50000000.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 50000000.0,
          "pct": 0.0
        }
      }
    },
    "VM1-I02.04": {
      "title": "",
      "unit": "Doanh thu đối tác",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 41096774.0,
          "pct": 41096774.0
        },
        "monthly_3": {
          "target": 182000000.0,
          "actual": 290171406.0,
          "pct": 1.59
        },
        "monthly_4": {
          "target": 312000000.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 312000000.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 312000000.0,
          "actual": 206468960.0
        },
        "yearly_2026": {
          "target": 1173490936.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 936000000.0
        },
        "weekly_1_1": {
          "target": 41096774.0,
          "actual": 41096774.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 41096774.0,
          "actual": 41096774.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 156000000.0
        },
        "weekly_1_6": {
          "target": 48600068.0,
          "actual": 0.31,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 39000000.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 11000000.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 11000000.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 18000000.0
        },
        "weekly_3_5": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 30000000.0,
          "actual": 15000000.0,
          "pct": 0.5
        },
        "weekly_4_2": {
          "target": 30000000.0,
          "actual": 15000000.0,
          "pct": 0.5
        },
        "weekly_4_3": {
          "target": 30000000.0,
          "actual": 25000000.0,
          "pct": 0.83
        },
        "weekly_4_4": {
          "target": 30000000.0,
          "actual": 25000000.0,
          "pct": 0.83
        },
        "weekly_4_5": {
          "target": 30000000.0,
          "actual": 25000000.0,
          "pct": 0.83
        },
        "weekly_5_1": {
          "target": 50000000.0,
          "actual": 15000000.0,
          "pct": 0.3
        },
        "weekly_5_2": {
          "target": 50000000.0
        },
        "weekly_6_2": {
          "target": 50000000.0,
          "actual": 10000000.0
        },
        "weekly_6_3": {
          "target": 50000000.0,
          "actual": 15000000.0
        },
        "weekly_6_4": {
          "target": 50000000.0,
          "actual": 15000000.0
        },
        "weekly_7_1": {
          "actual": 15000000.0
        },
        "weekly_7_2": {
          "actual": 20000000.0
        },
        "weekly_7_3": {
          "actual": 20000000.0
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.02": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí mua công cụ AI phân bổ hàng tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Chi phí CTV",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 12.0,
          "pct": 12.0
        },
        "monthly_3": {
          "target": 58.0,
          "actual": 60.0
        },
        "monthly_4": {
          "target": 54.0,
          "actual": 58.0,
          "pct": 1.07
        },
        "monthly_5": {
          "target": 56.0,
          "actual": 57.0,
          "pct": 1.02
        },
        "monthly_6": {
          "target": 52.0,
          "actual": 56.0
        },
        "monthly_7": {
          "target": 120.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 140.0,
          "actual": 147.0,
          "pct": 1.05
        },
        "quarterly_1": {
          "target": 219.0,
          "actual": 206.0,
          "pct": 0.94
        },
        "quarterly_2": {
          "target": 135.0
        },
        "weekly_1_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 9.0,
          "actual": 9.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 37.0
        },
        "weekly_1_6": {
          "target": 45.0,
          "actual": 1.22,
          "pct": 9.0
        },
        "weekly_2_1": {
          "target": 14.0,
          "actual": 1.56,
          "pct": 12.0
        },
        "weekly_2_2": {
          "target": 11.0
        },
        "weekly_2_3": {
          "pct": 8.0
        },
        "weekly_2_4": {
          "target": 16.0
        },
        "weekly_3_1": {
          "target": 13.0,
          "actual": 13.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 13.0,
          "actual": 13.0
        },
        "weekly_3_3": {
          "target": 15.0,
          "actual": 17.0,
          "pct": 1.13
        },
        "weekly_3_4": {
          "target": 12.0,
          "actual": 12.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 12.0,
          "actual": 13.0
        },
        "weekly_4_2": {
          "target": 13.0,
          "actual": 13.0
        },
        "weekly_4_3": {
          "target": 14.0,
          "actual": 13.0
        },
        "weekly_4_4": {
          "target": 11.0,
          "actual": 16.0
        },
        "weekly_4_5": {
          "target": 7.0,
          "actual": 8.0
        },
        "weekly_5_1": {
          "target": 10.0,
          "actual": 10.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 12.0,
          "actual": 11.0
        },
        "weekly_5_3": {
          "target": 11.0,
          "actual": 12.0
        },
        "weekly_5_4": {
          "target": 11.0,
          "actual": 16.0
        },
        "weekly_6_1": {
          "target": 13.0,
          "actual": 13.0
        },
        "weekly_6_2": {
          "target": 12.0,
          "actual": 12.0
        },
        "weekly_6_3": {
          "target": 12.0,
          "actual": 10.0
        },
        "weekly_6_4": {
          "target": 12.0,
          "actual": 11.0
        },
        "weekly_7_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 9.0,
          "pct": 1.13
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_4": {
          "target": 8.0
        }
      }
    },
    "Số lượng video hoàn thành sản xuất (SNXD)": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Chi phí CTV",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 9.0,
          "pct": 9.0
        },
        "monthly_3": {
          "target": 38.0,
          "actual": 40.0
        },
        "monthly_4": {
          "target": 34.0,
          "actual": 38.0,
          "pct": 1.12
        },
        "monthly_5": {
          "target": 36.0,
          "actual": 37.0,
          "pct": 1.03
        },
        "monthly_6": {
          "target": 32.0,
          "actual": 36.0
        },
        "monthly_7": {
          "target": 30.0
        },
        "yearly_2026": {
          "target": 90.0,
          "actual": 111.0,
          "pct": 1.23
        },
        "quarterly_1": {
          "target": 144.0,
          "actual": 131.0,
          "pct": 0.91
        },
        "quarterly_2": {
          "target": 135.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 25.0
        },
        "weekly_1_6": {
          "target": 33.0,
          "actual": 1.32,
          "pct": 6.0
        },
        "weekly_2_1": {
          "target": 11.0,
          "actual": 1.83,
          "pct": 9.0
        },
        "weekly_2_2": {
          "target": 8.0
        },
        "weekly_2_3": {
          "pct": 6.0
        },
        "weekly_2_4": {
          "target": 14.0
        },
        "weekly_3_1": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 9.0,
          "actual": 8.0
        },
        "weekly_3_3": {
          "target": 10.0,
          "actual": 12.0,
          "pct": 1.2
        },
        "weekly_3_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 10.0
        },
        "weekly_4_1": {
          "target": 7.0,
          "actual": 8.0
        },
        "weekly_4_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_3": {
          "target": 10.0,
          "actual": 9.0
        },
        "weekly_4_4": {
          "target": 7.0,
          "actual": 11.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 5.0
        },
        "weekly_5_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 9.0,
          "actual": 8.0
        },
        "weekly_5_3": {
          "target": 8.0,
          "actual": 9.0
        },
        "weekly_5_4": {
          "target": 8.0,
          "actual": 12.0
        },
        "weekly_6_1": {
          "target": 9.0,
          "actual": 9.0
        },
        "weekly_6_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_3": {
          "target": 8.0,
          "actual": 6.0
        },
        "weekly_6_4": {
          "target": 8.0,
          "actual": 7.0
        },
        "weekly_6_5": {
          "target": 8.0
        },
        "weekly_7_1": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 9.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_4": {
          "target": 8.0
        }
      }
    },
    "Số lượng video 2D hoàn thành sản xuất": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 3.0,
          "pct": 3.0
        },
        "monthly_3": {
          "target": 20.0,
          "actual": 20.0
        },
        "monthly_4": {
          "target": 20.0,
          "actual": 20.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 20.0,
          "actual": 20.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 20.0,
          "actual": 20.0
        },
        "monthly_7": {
          "target": 90.0
        },
        "yearly_2026": {
          "target": 50.0,
          "actual": 36.0,
          "pct": 0.72
        },
        "quarterly_1": {
          "target": 75.0,
          "actual": 75.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 12.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 3.0
        },
        "weekly_2_3": {
          "pct": 2.0
        },
        "weekly_2_4": {
          "target": 2.0
        },
        "weekly_3_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 5.0
        },
        "weekly_3_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 4.0
        },
        "weekly_4_1": {
          "target": 5.0,
          "actual": 5.0
        },
        "weekly_4_2": {
          "target": 5.0,
          "actual": 5.0
        },
        "weekly_4_3": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_4_4": {
          "target": 4.0,
          "actual": 5.0
        },
        "weekly_4_5": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_5_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_5_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_5_4": {
          "target": 3.0,
          "actual": 4.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_6_3": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0
        }
      }
    },
    "VM2-I01.3": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Ý tưởng",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM2-I01.4": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Số lượng ý tưởng được chọn",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM2-I01.5": {
      "title": "ROI",
      "unit": "Tỷ lệ chọn ý tưởng",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM2-I01.6": {
      "title": "SL Kịch bản mới SX",
      "unit": "Kịch bản",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "actual": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "monthly_5": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 3.0
        },
        "monthly_7": {
          "target": 4.0
        },
        "yearly_2026": {
          "target": 20.0,
          "actual": 1.0,
          "pct": 0.05
        },
        "quarterly_1": {
          "target": 20.0,
          "actual": 6.0,
          "pct": 0.3
        },
        "quarterly_2": {
          "target": 15.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "VM2-I02.02": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng X views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "actual": 0.0
        },
        "monthly_3": {
          "target": 10.0,
          "actual": 6.0
        },
        "monthly_4": {
          "target": 20.0,
          "actual": 7.0,
          "pct": 0.35
        },
        "monthly_5": {
          "target": 20.0,
          "actual": 12.0,
          "pct": 0.6
        },
        "monthly_6": {
          "target": 20.0,
          "actual": 12.0
        },
        "monthly_7": {
          "target": 20.0
        },
        "yearly_2026": {
          "target": 100.0,
          "actual": 15.0,
          "pct": 0.15
        },
        "quarterly_1": {
          "target": 100.0,
          "actual": 31.0,
          "pct": 0.31
        },
        "quarterly_2": {
          "target": 60.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 15.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "pct": 3.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_7_1": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "TM3-I01.03": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video upload",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 5.0,
          "pct": 5.0
        },
        "monthly_3": {
          "target": 38.0,
          "actual": 38.0
        },
        "monthly_4": {
          "target": 38.0,
          "actual": 58.0,
          "pct": 1.53
        },
        "monthly_5": {
          "target": 56.0,
          "actual": 60.0,
          "pct": 1.07
        },
        "monthly_6": {
          "target": 60.0,
          "actual": 60.0
        },
        "monthly_7": {
          "target": 120.0
        },
        "yearly_2026": {
          "target": 230.0,
          "actual": 106.0,
          "pct": 0.46
        },
        "quarterly_1": {
          "target": 230.0,
          "actual": 178.0,
          "pct": 0.77
        },
        "quarterly_2": {
          "target": 135.0
        },
        "weekly_1_1": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 9.0,
          "actual": 9.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 30.0
        },
        "weekly_1_6": {
          "target": 30.0,
          "pct": 5.0
        },
        "weekly_2_1": {
          "target": 5.0,
          "pct": 6.0
        },
        "weekly_2_2": {
          "target": 6.0,
          "pct": 8.0
        },
        "weekly_2_3": {
          "target": 8.0,
          "pct": 8.0
        },
        "weekly_2_4": {
          "target": 8.0
        },
        "weekly_3_1": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_3_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_3_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 8.0
        },
        "weekly_4_1": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_4": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_5": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_5_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_5_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_5_4": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_1": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_4": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_6_5": {
          "target": 8.0
        },
        "weekly_7_1": {
          "target": 15.0,
          "actual": 15.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_4": {
          "target": 8.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "SL video đạt ngưỡng X view trên nền tảng Youtube trong kỳ": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.85,
          "actual": 49677419.0,
          "pct": 70814007.0
        },
        "monthly_3": {
          "target": 560000000.0,
          "actual": 450013541.0,
          "pct": 0.8
        },
        "monthly_4": {
          "target": 610000000.0,
          "actual": 438771099.0,
          "pct": 0.72
        },
        "monthly_5": {
          "target": 650000000.0,
          "actual": 433472676.0,
          "pct": 0.67
        },
        "monthly_6": {
          "target": 650000000.0,
          "actual": 365705039.0,
          "pct": 0.56
        },
        "monthly_7": {
          "target": 650000000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1387299999.0,
          "actual": 1244098927.0,
          "pct": 0.9
        },
        "quarterly_1": {
          "target": 2173000000.0,
          "actual": 1369639592.0,
          "pct": 0.63
        },
        "quarterly_2": {
          "target": 1950000000.0
        },
        "weekly_1_1": {
          "target": 86935484.0,
          "actual": 38613980.0,
          "pct": 0.44
        },
        "weekly_1_2": {
          "target": 49677419.0,
          "actual": 34325808.0,
          "pct": 0.69
        },
        "weekly_1_4": {
          "target": 1.43
        },
        "weekly_1_5": {
          "pct": 504800000.0
        },
        "weekly_1_6": {
          "target": 375502326.0,
          "actual": 0.74,
          "pct": 126200000.0
        },
        "weekly_2_1": {
          "target": 81291035.0,
          "actual": 0.64,
          "pct": 126200000.0
        },
        "weekly_2_2": {
          "target": 94180806.0,
          "actual": 0.75,
          "pct": 126200000.0
        },
        "weekly_2_3": {
          "target": 103354564.0,
          "actual": 0.82,
          "pct": 126200000.0
        },
        "weekly_2_4": {
          "target": 97910883.0,
          "actual": 0.78
        },
        "weekly_3_1": {
          "target": 140000000.0,
          "actual": 128982598.0,
          "pct": 0.92
        },
        "weekly_3_2": {
          "target": 140000000.0,
          "actual": 112030301.0,
          "pct": 0.8
        },
        "weekly_3_3": {
          "target": 140000000.0,
          "actual": 103500321.0,
          "pct": 0.74
        },
        "weekly_3_4": {
          "target": 140000000.0,
          "actual": 105500321.0,
          "pct": 0.75
        },
        "weekly_3_5": {
          "target": 140000000.0
        },
        "weekly_4_1": {
          "target": 142333333.0,
          "actual": 107644579.0,
          "pct": 0.76
        },
        "weekly_4_2": {
          "target": 142333333.0,
          "actual": 106238518.0,
          "pct": 0.75
        },
        "weekly_4_3": {
          "target": 142333333.0,
          "actual": 111491344.0,
          "pct": 0.78
        },
        "weekly_4_4": {
          "target": 142333333.0,
          "actual": 99916380.0,
          "pct": 0.7
        },
        "weekly_4_5": {
          "target": 142333333.0
        },
        "weekly_5_1": {
          "target": 162500000.0,
          "actual": 121794312.0,
          "pct": 0.75
        },
        "weekly_5_2": {
          "target": 162500000.0,
          "actual": 112741810.0,
          "pct": 0.69
        },
        "weekly_5_3": {
          "target": 162500000.0,
          "actual": 80756483.0,
          "pct": 0.5
        },
        "weekly_5_4": {
          "target": 162500000.0,
          "actual": 80319462.0
        },
        "weekly_6_1": {
          "target": 162500000.0,
          "actual": 88603019.0,
          "pct": 0.55
        },
        "weekly_6_2": {
          "target": 162500000.0,
          "actual": 94212772.0,
          "pct": 0.58
        },
        "weekly_6_3": {
          "target": 162500000.0,
          "actual": 101627543.0,
          "pct": 0.63
        },
        "weekly_6_4": {
          "target": 162500000.0,
          "actual": 89394118.0,
          "pct": 0.55
        },
        "weekly_7_1": {
          "target": 162500000.0,
          "actual": 68579504.0,
          "pct": 0.42
        },
        "weekly_7_2": {
          "target": 162500000.0,
          "actual": 92818433.0,
          "pct": 0.57
        },
        "weekly_7_3": {
          "target": 162500000.0,
          "actual": 93163093.0,
          "pct": 0.57
        },
        "weekly_7_4": {
          "target": 162500000.0
        }
      }
    },
    "Tổng sổ views trên các kênh của đơn vị": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.89,
          "actual": 38612903.0,
          "pct": 61756974.0
        },
        "monthly_3": {
          "target": 220000000.0,
          "actual": 197149616.0,
          "pct": 0.9
        },
        "monthly_4": {
          "target": 190000000.0,
          "actual": 175390176.0,
          "pct": 0.92
        },
        "monthly_5": {
          "target": 200000000.0,
          "actual": 145055048.0,
          "pct": 0.73
        },
        "monthly_6": {
          "target": 250000000.0,
          "actual": 136302005.0,
          "pct": 0.55
        },
        "monthly_7": {
          "target": 260000000.0
        },
        "yearly_2026": {
          "target": 465441000.0,
          "actual": 541507496.0,
          "pct": 1.16
        },
        "quarterly_1": {
          "target": 868000000.0,
          "actual": 487258529.0,
          "pct": 0.56
        },
        "quarterly_2": {
          "target": 980000000.0
        },
        "weekly_1_1": {
          "target": 38612903.0,
          "actual": 32384231.0,
          "pct": 0.84
        },
        "weekly_1_2": {
          "target": 38612903.0,
          "actual": 28312493.0,
          "pct": 0.73
        },
        "weekly_1_4": {
          "target": 1.6
        },
        "weekly_1_5": {
          "pct": 188100000.0
        },
        "weekly_1_6": {
          "target": 172432016.0,
          "actual": 0.92,
          "pct": 47025000.0
        },
        "weekly_2_1": {
          "target": 38656049.0,
          "actual": 0.82,
          "pct": 47025000.0
        },
        "weekly_2_2": {
          "target": 45369119.0,
          "actual": 0.96,
          "pct": 47025000.0
        },
        "weekly_2_3": {
          "target": 47598472.0,
          "actual": 1.01,
          "pct": 47025000.0
        },
        "weekly_2_4": {
          "target": 40752719.0,
          "actual": 0.87
        },
        "weekly_3_1": {
          "target": 55000000.0,
          "actual": 51278525.0,
          "pct": 0.93
        },
        "weekly_3_2": {
          "target": 55000000.0,
          "actual": 43345017.0,
          "pct": 0.79
        },
        "weekly_3_3": {
          "target": 55000000.0,
          "actual": 37166939.0,
          "pct": 0.68
        },
        "weekly_3_4": {
          "target": 55000000.0,
          "actual": 45467229.0,
          "pct": 0.83
        },
        "weekly_3_5": {
          "target": 55000000.0
        },
        "weekly_4_1": {
          "target": 44333333.0,
          "actual": 31924171.0,
          "pct": 0.72
        },
        "weekly_4_2": {
          "target": 44333333.0,
          "actual": 32383503.0,
          "pct": 0.73
        },
        "weekly_4_3": {
          "target": 44333333.0,
          "actual": 31868316.0,
          "pct": 0.72
        },
        "weekly_4_4": {
          "target": 44333333.0,
          "actual": 33345961.0,
          "pct": 0.75
        },
        "weekly_4_5": {
          "target": 44333333.0
        },
        "weekly_5_1": {
          "target": 50000000.0,
          "actual": 33906492.0,
          "pct": 0.68
        },
        "weekly_5_2": {
          "target": 50000000.0,
          "actual": 33912343.0,
          "pct": 0.68
        },
        "weekly_5_3": {
          "target": 50000000.0,
          "actual": 33348580.0,
          "pct": 0.67
        },
        "weekly_5_4": {
          "target": 50000000.0,
          "actual": 31238029.0
        },
        "weekly_6_1": {
          "target": 62500000.0,
          "actual": 31150449.0,
          "pct": 0.5
        },
        "weekly_6_2": {
          "target": 62500000.0,
          "actual": 31632197.0,
          "pct": 0.51
        },
        "weekly_6_3": {
          "target": 62500000.0,
          "actual": 34077748.0,
          "pct": 0.55
        },
        "weekly_6_4": {
          "target": 62500000.0,
          "actual": 33632036.0,
          "pct": 0.54
        },
        "weekly_7_1": {
          "target": 62500000.0,
          "actual": 28761294.0,
          "pct": 0.46
        },
        "weekly_7_2": {
          "target": 62500000.0,
          "actual": 40289689.0,
          "pct": 0.64
        },
        "weekly_7_3": {
          "target": 62500000.0,
          "actual": 32781482.0,
          "pct": 0.52
        },
        "weekly_7_4": {
          "target": 62500000.0
        }
      }
    },
    "Kinh doanh Traffic Long": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_3": {
          "target": 280000000.0,
          "actual": 275189705.0,
          "pct": 0.98
        },
        "monthly_4": {
          "target": 330000000.0,
          "actual": 216101243.0,
          "pct": 0.65
        },
        "monthly_5": {
          "target": 360000000.0,
          "actual": 234635445.0,
          "pct": 0.65
        },
        "monthly_6": {
          "target": 300000000.0,
          "actual": 186912206.0,
          "pct": 0.62
        },
        "monthly_7": {
          "target": 300000000.0
        },
        "yearly_2026": {
          "target": 705000000.0,
          "actual": 650094935.0,
          "pct": 0.92
        },
        "quarterly_1": {
          "target": 1000000000.0,
          "actual": 720567450.0,
          "pct": 0.72
        },
        "quarterly_2": {
          "target": 750000000.0
        },
        "weekly_1_5": {
          "pct": 260000000.0
        },
        "weekly_1_6": {
          "target": 161000000.0,
          "actual": 0.62,
          "pct": 65000000.0
        },
        "weekly_2_1": {
          "target": 34413775.0,
          "actual": 0.53,
          "pct": 65000000.0
        },
        "weekly_2_2": {
          "target": 37845611.0,
          "actual": 0.58,
          "pct": 65000000.0
        },
        "weekly_2_3": {
          "target": 41740534.0,
          "actual": 0.64,
          "pct": 65000000.0
        },
        "weekly_2_4": {
          "target": 47908991.0,
          "actual": 0.74
        },
        "weekly_3_1": {
          "target": 70000000.0,
          "actual": 65834089.0,
          "pct": 0.94
        },
        "weekly_3_2": {
          "target": 70000000.0,
          "actual": 59424096.0,
          "pct": 0.85
        },
        "weekly_3_3": {
          "target": 70000000.0,
          "actual": 57827901.0,
          "pct": 0.83
        },
        "weekly_3_4": {
          "target": 70000000.0,
          "actual": 53494860.0,
          "pct": 0.76
        },
        "weekly_3_5": {
          "target": 70000000.0
        },
        "weekly_4_1": {
          "target": 77000000.0,
          "actual": 62345628.0,
          "pct": 0.81
        },
        "weekly_4_2": {
          "target": 77000000.0,
          "actual": 61767892.0,
          "pct": 0.8
        },
        "weekly_4_3": {
          "target": 77000000.0,
          "actual": 68294644.0,
          "pct": 0.89
        },
        "weekly_4_4": {
          "target": 77000000.0,
          "actual": 56600945.0,
          "pct": 0.74
        },
        "weekly_4_5": {
          "target": 77000000.0
        },
        "weekly_5_1": {
          "target": 90000000.0,
          "actual": 74120817.0,
          "pct": 0.82
        },
        "weekly_5_2": {
          "target": 90000000.0,
          "actual": 66318695.0,
          "pct": 0.74
        },
        "weekly_5_3": {
          "target": 90000000.0,
          "actual": 34966946.0,
          "pct": 0.39
        },
        "weekly_5_4": {
          "target": 90000000.0,
          "actual": 38429719.0
        },
        "weekly_6_1": {
          "target": 75000000.0,
          "actual": 47601787.0,
          "pct": 0.63
        },
        "weekly_6_2": {
          "target": 75000000.0,
          "actual": 51091123.0,
          "pct": 0.68
        },
        "weekly_6_3": {
          "target": 75000000.0,
          "actual": 56819430.0,
          "pct": 0.76
        },
        "weekly_6_4": {
          "target": 75000000.0,
          "actual": 45907474.0,
          "pct": 0.61
        },
        "weekly_7_1": {
          "target": 75000000.0,
          "actual": 31885726.0,
          "pct": 0.43
        },
        "weekly_7_2": {
          "target": 75000000.0,
          "actual": 42817480.0,
          "pct": 0.57
        },
        "weekly_7_3": {
          "target": 75000000.0,
          "actual": 50933057.0,
          "pct": 0.68
        },
        "weekly_7_4": {
          "target": 75000000.0
        }
      }
    },
    "VM3-I01.04": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM3-I01.05": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "Kinh doanh Traffic Short": {
      "title": "Số lượt tiếp cận (Impression)",
      "unit": "Imp",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 1500000000.0,
          "actual": 948080029.0,
          "pct": 0.63
        },
        "monthly_4": {
          "target": 1150000000.0,
          "actual": 703464051.0,
          "pct": 0.61
        },
        "monthly_5": {
          "target": 1700000000.0,
          "actual": 900000000.0,
          "pct": 0.53
        },
        "monthly_6": {
          "target": 1200000000.0,
          "actual": 841216556.0,
          "pct": 0.7
        },
        "monthly_7": {
          "target": 1200000000.0
        },
        "yearly_2026": {
          "target": 8000000000.0,
          "actual": 2803562210.0,
          "pct": 0.35
        },
        "weekly_1_5": {
          "pct": 1500000000.0
        },
        "weekly_1_6": {
          "target": 952633293.0,
          "actual": 0.64,
          "pct": 375000000.0
        },
        "weekly_2_1": {
          "target": 211834031.0,
          "actual": 0.56,
          "pct": 375000000.0
        },
        "weekly_2_2": {
          "target": 246384118.0,
          "actual": 0.66,
          "pct": 375000000.0
        },
        "weekly_2_3": {
          "target": 260855096.0,
          "actual": 0.7,
          "pct": 375000000.0
        },
        "weekly_2_4": {
          "target": 211692829.0,
          "actual": 0.56
        },
        "weekly_3_1": {
          "target": 338709677.0,
          "actual": 240838878.0,
          "pct": 0.71
        },
        "weekly_3_2": {
          "target": 338709677.0,
          "actual": 208047127.0,
          "pct": 0.61
        },
        "weekly_3_3": {
          "target": 338709677.0,
          "actual": 200240976.0,
          "pct": 0.59
        },
        "weekly_3_4": {
          "target": 338709677.0,
          "actual": 227455787.0,
          "pct": 0.67
        },
        "weekly_3_5": {
          "target": 338709677.0
        },
        "weekly_4_1": {
          "target": 268333333.0,
          "actual": 204770694.0,
          "pct": 0.76
        },
        "weekly_4_2": {
          "target": 268333333.0,
          "actual": 189750787.0,
          "pct": 0.71
        },
        "weekly_4_3": {
          "target": 268333333.0,
          "actual": 177524445.0,
          "pct": 0.66
        },
        "weekly_4_4": {
          "target": 268333333.0,
          "actual": 178995305.0,
          "pct": 0.67
        },
        "weekly_5_1": {
          "target": 425000000.0,
          "actual": 225252465.0,
          "pct": 0.53
        },
        "weekly_5_2": {
          "target": 425000000.0,
          "actual": 196248075.0,
          "pct": 0.46
        },
        "weekly_5_3": {
          "target": 425000000.0
        },
        "weekly_5_4": {
          "target": 425000000.0
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM4-I01.01": {
      "title": "Độ phủ thương hiệu",
      "unit": "TM3-I01.06",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "yearly_2026": {
          "target": 250000000.0
        }
      }
    },
    "Số lượt tiếp cận khách hàng mới trên các nền tảng": {
      "title": "VM4-I01.01",
      "unit": "Subs/Followers",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 400000.0,
          "actual": 289381.0,
          "pct": 0.72
        },
        "monthly_4": {
          "target": 400000.0
        },
        "monthly_5": {
          "target": 400000.0,
          "actual": 260000.0,
          "pct": 0.65
        },
        "monthly_6": {
          "target": 350000.0,
          "actual": 170434.0,
          "pct": 0.49
        },
        "monthly_7": {
          "target": 250000.0
        },
        "yearly_2026": {
          "target": 1875000.0,
          "actual": 842523.0,
          "pct": 0.45
        },
        "quarterly_1": {
          "target": 1500000.0,
          "actual": 600000.0,
          "pct": 0.4
        },
        "quarterly_2": {
          "target": 1000000.0
        },
        "weekly_1_5": {
          "pct": 323735.0
        },
        "weekly_1_6": {
          "target": 283363.0,
          "actual": 0.88
        }
      }
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 2.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 1.0
        },
        "monthly_7": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "Tổng số subcribers/Followers tăng trưởng": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt ngưỡng 5k$/ tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 6.0,
          "actual": 6.0
        },
        "monthly_4": {
          "target": 6.0
        },
        "monthly_5": {
          "target": 6.0,
          "actual": 3.0
        },
        "monthly_6": {
          "target": 6.0,
          "actual": 4.0
        },
        "monthly_7": {
          "target": 6.0
        },
        "yearly_2026": {
          "target": 8.0,
          "actual": 4.0,
          "pct": 0.5
        },
        "quarterly_1": {
          "target": 6.0,
          "actual": 4.0,
          "pct": 0.67
        },
        "quarterly_2": {
          "target": 6.0
        },
        "weekly_1_5": {
          "pct": 6.0
        },
        "weekly_1_6": {
          "target": 3.0
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 2.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 2.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 4.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 1.0,
          "actual": 0.97
        },
        "monthly_4": {
          "target": 1.0
        },
        "monthly_5": {
          "target": 1.0
        },
        "monthly_6": {
          "target": 1.0
        },
        "monthly_7": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.95,
          "pct": 0.95
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.95,
          "pct": 0.95
        },
        "quarterly_2": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 2.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.03": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 3.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "monthly_5": {
          "actual": 1.0
        },
        "monthly_6": {
          "actual": 2.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 1.2
        },
        "quarterly_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 5.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 3.0
        }
      }
    },
    "Số kênh kinh doanh mở mới trong kỳ": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh trả lại",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "quarterly_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 2.0
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 7.0,
          "actual": 7.0
        },
        "monthly_4": {
          "target": 6.3
        },
        "monthly_5": {
          "actual": 6.0
        },
        "monthly_6": {
          "target": 6.0,
          "actual": 5.8
        },
        "yearly_2026": {
          "target": 6.5,
          "actual": 6.5,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 6.5,
          "actual": 5.8,
          "pct": 1.12
        },
        "quarterly_2": {
          "target": 6.0
        },
        "weekly_1_5": {
          "pct": 7.2
        },
        "weekly_1_6": {
          "target": 7.0,
          "actual": 0.97
        }
      }
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 7.0,
          "actual": 7.0
        },
        "monthly_4": {
          "target": 2.8,
          "actual": 3.17
        },
        "monthly_5": {
          "target": 3.0,
          "actual": 3.36
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 3.27
        },
        "monthly_7": {
          "target": 3.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 2.47,
          "pct": 1.23
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.55,
          "pct": 1.28
        },
        "quarterly_2": {
          "target": 2.5
        },
        "weekly_1_5": {
          "pct": 7.2
        },
        "weekly_1_6": {
          "target": 7.0,
          "actual": 0.97
        }
      }
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 100000000.0,
          "actual": 92930750.0,
          "pct": 0.93
        },
        "monthly_4": {
          "target": 111516900.0
        },
        "monthly_5": {
          "target": 111516900.0
        },
        "monthly_6": {
          "target": 111516900.0
        },
        "monthly_7": {
          "target": 111516900.0
        },
        "yearly_2026": {
          "target": 130810000.0,
          "actual": 101987827.0,
          "pct": 0.78
        },
        "quarterly_1": {
          "target": 130810000.0,
          "actual": 160304147.0,
          "pct": 1.23
        },
        "quarterly_2": {
          "target": 175000000.0
        },
        "weekly_1_5": {
          "pct": 100000000.0
        },
        "weekly_1_6": {
          "target": 101987827.0,
          "actual": 1.02
        }
      }
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 250000000.0,
          "actual": 232326875.0,
          "pct": 0.93
        },
        "monthly_4": {
          "target": 278792250.0
        },
        "monthly_5": {
          "target": 278792250.0
        },
        "monthly_6": {
          "target": 278792250.0
        },
        "monthly_7": {
          "target": 278792250.0
        },
        "yearly_2026": {
          "target": 391815000.0,
          "actual": 195225059.0,
          "pct": 0.5
        },
        "quarterly_1": {
          "target": 350815000.0,
          "actual": 218960201.0,
          "pct": 0.62
        },
        "quarterly_2": {
          "target": 350000000.0
        },
        "weekly_1_5": {
          "pct": 250000000.0
        },
        "weekly_1_6": {
          "target": 220973625.0,
          "actual": 0.88
        }
      }
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chi phí Tb sản xuất 1 sản phẩm": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "CP SX Sản phẩm Wolfoo": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số lượng đầu mục công việc/ quy trình được số hóa": {
      "title": "ROI",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 12.0,
          "actual": 12.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 12.0,
          "actual": 12.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 5.0
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 0.7,
          "actual": 1.0,
          "pct": 1.43
        },
        "quarterly_1": {
          "target": 0.7,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.1,
          "actual": 1.0,
          "pct": 10.0
        },
        "quarterly_1": {
          "target": 0.1,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.2
        }
      }
    },
    "TM7-I02": {
      "title": "ROI",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.1,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.1,
          "actual": 0.1,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.1
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.01
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.95
        },
        "monthly_4": {
          "target": 0.95,
          "actual": 0.96,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0
        },
        "monthly_7": {
          "target": 0.95
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 0.95,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 0.95,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.95
        },
        "weekly_1_5": {
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.96,
          "actual": 0.0
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 10.0
        },
        "monthly_4": {
          "actual": 4.0
        },
        "monthly_5": {
          "actual": 3.0
        },
        "monthly_6": {
          "actual": 4.0
        },
        "yearly_2026": {
          "target": 15.0,
          "actual": 28.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 15.0,
          "actual": 18.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 15.0
        },
        "weekly_1_5": {
          "pct": 10.0
        },
        "weekly_1_6": {
          "target": 12.0
        }
      }
    }
  },
  "AS": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 1.2151,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.4058,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.4058,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.4058,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.4058,
          "actual": 0.3062,
          "pct": 0.7545
        },
        "monthly_7": {
          "target": 1.192,
          "actual": -0.2454,
          "pct": -0.2059
        },
        "yearly_2026": {
          "target": 0.434,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.8511,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 1.0231,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.4058
        },
        "weekly_1_6": {
          "actual": 0.0
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 0.5486,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.2887,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.2887,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.2887,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.2887,
          "actual": -0.042,
          "pct": -0.1457
        },
        "monthly_7": {
          "target": 0.5438,
          "actual": -0.2973,
          "pct": -0.5468
        },
        "yearly_2026": {
          "target": 0.3027,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.4598,
          "actual": -0.1289,
          "pct": -0.2804
        },
        "quarterly_2": {
          "target": 0.5057,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.2887
        },
        "weekly_1_6": {
          "actual": 0.0
        },
        "weekly_6_2": {
          "actual": 0.0881,
          "pct": 0.0347
        },
        "weekly_6_3": {
          "actual": 0.1371,
          "pct": -0.0383
        },
        "weekly_6_4": {
          "actual": 0.0241
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.9327
        },
        "monthly_4": {
          "pct": 0.7483
        },
        "monthly_5": {
          "pct": 0.6565
        },
        "monthly_6": {
          "pct": 0.6131
        },
        "monthly_7": {
          "pct": 0.3656
        },
        "weekly_1_5": {
          "actual": 1.0
        },
        "weekly_1_6": {
          "actual": 0.9916
        },
        "weekly_2_5": {
          "pct": 1.0
        },
        "weekly_4_1": {
          "actual": 0.885
        },
        "weekly_7_2": {
          "actual": -0.12
        }
      }
    },
    "2.1": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 7805200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.9507,
          "actual": 261216192.0,
          "pct": 214939370.0
        },
        "monthly_3": {
          "target": 1542944000.0,
          "actual": 1385445880.0,
          "pct": 0.8979
        },
        "monthly_4": {
          "target": 1785940000.0,
          "actual": 1295884140.0,
          "pct": 0.7256
        },
        "monthly_5": {
          "target": 1901578490.0,
          "actual": 1219590347.0,
          "pct": 0.6414
        },
        "monthly_6": {
          "target": 1964830030.0,
          "actual": 1240853162.0,
          "pct": 0.6315
        },
        "monthly_7": {
          "target": 2038560600.0,
          "actual": 716852540.0,
          "pct": 0.3516
        },
        "yearly_2026": {
          "target": 4274010000.0,
          "actual": 4099904035.0,
          "pct": 0.9593
        },
        "quarterly_1": {
          "target": 5929170000.0,
          "actual": 3716024056.0,
          "pct": 0.6267
        },
        "quarterly_2": {
          "target": 7155720000.0,
          "actual": 176477024.0,
          "pct": 0.0247
        },
        "weekly_1_1": {
          "target": 257455840.0,
          "actual": 241598226.0,
          "pct": 0.9384
        },
        "weekly_1_2": {
          "target": 184491290.0,
          "actual": 208836962.0,
          "pct": 1.132
        },
        "weekly_1_4": {
          "target": 0.8228,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 1382002500.0
        },
        "weekly_1_6": {
          "target": 1333301800.0,
          "actual": 0.9648,
          "pct": 255450000.0
        },
        "weekly_2_1": {
          "target": 194958880.0,
          "actual": 0.7632,
          "pct": 255450000.0
        },
        "weekly_2_2": {
          "target": 211508960.0,
          "actual": 0.828,
          "pct": 250770000.0
        },
        "weekly_2_3": {
          "target": 259417080.0,
          "actual": 1.0345,
          "pct": 293124000.0
        },
        "weekly_2_4": {
          "target": 239846880.0,
          "actual": 0.8182
        },
        "weekly_3_1": {
          "target": 296660000.0,
          "actual": 214766240.0,
          "pct": 0.7239
        },
        "weekly_3_2": {
          "target": 256984000.0,
          "actual": 228855640.0,
          "pct": 0.8905
        },
        "weekly_3_3": {
          "target": 270556000.0,
          "actual": 251134000.0,
          "pct": 0.9282
        },
        "weekly_3_4": {
          "target": 293748000.0,
          "actual": 229866000.0,
          "pct": 0.7825
        },
        "weekly_3_5": {
          "actual": 93808000.0
        },
        "weekly_4_1": {
          "target": 257218000.0,
          "actual": 203424000.0,
          "pct": 0.7909
        },
        "weekly_4_2": {
          "target": 322114000.0,
          "actual": 189291960.0,
          "pct": 0.5877
        },
        "weekly_4_3": {
          "target": 251628000.0,
          "actual": 194391000.0,
          "pct": 0.7725
        },
        "weekly_4_4": {
          "target": 246844000.0,
          "actual": 210849600.0,
          "pct": 0.8542
        },
        "weekly_4_5": {
          "target": 256880000.0,
          "actual": 144828320.0,
          "pct": 0.5638
        },
        "weekly_5_1": {
          "target": 366285716.0,
          "actual": 259973285.0,
          "pct": 0.7098
        },
        "weekly_5_2": {
          "target": 333593702.0,
          "actual": 200311694.0,
          "pct": 0.6005
        },
        "weekly_5_3": {
          "target": 351157766.0,
          "actual": 189676209.0,
          "pct": 0.5401
        },
        "weekly_5_4": {
          "target": 351157766.0,
          "actual": 212206303.0,
          "pct": 0.6043
        },
        "weekly_6_1": {
          "target": 377164081.0,
          "actual": 186409084.0,
          "pct": 0.4942
        },
        "weekly_6_2": {
          "target": 340807514.0,
          "actual": 192880952.0,
          "pct": 0.566
        },
        "weekly_6_3": {
          "target": 360697771.0,
          "actual": 189615019.0,
          "pct": 0.5257
        },
        "weekly_6_4": {
          "target": 252464454.0,
          "actual": 199296682.0,
          "pct": 0.7894
        },
        "weekly_7_1": {
          "target": 171314000.0,
          "actual": 176477024.0,
          "pct": 1.0301
        },
        "weekly_7_2": {
          "target": 281944000.0,
          "actual": 154934000.0,
          "pct": 0.5495
        },
        "weekly_7_3": {
          "target": 278772000.0,
          "actual": 158886000.0,
          "pct": 0.5699
        },
        "weekly_7_4": {
          "target": 253136000.0,
          "actual": 0.0
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu nội bộ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 7571200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.9733,
          "actual": 250816192.0,
          "pct": 209476250.0
        },
        "monthly_3": {
          "target": 1475344000.0,
          "actual": 1376102000.0,
          "pct": 0.9327
        },
        "monthly_4": {
          "target": 1718340000.0,
          "actual": 1285884140.0,
          "pct": 0.7483
        },
        "monthly_5": {
          "target": 1823578490.0,
          "actual": 1197229148.0,
          "pct": 0.6565
        },
        "monthly_6": {
          "target": 1886830030.0,
          "actual": 1156795236.0,
          "pct": 0.6131
        },
        "monthly_7": {
          "target": 1960560600.0,
          "actual": 716852540.0,
          "pct": 0.3656
        },
        "yearly_2026": {
          "target": 4071210000.0,
          "actual": 4053730773.0,
          "pct": 0.9957
        },
        "quarterly_1": {
          "target": 5695170000.0,
          "actual": 3611081250.0,
          "pct": 0.6341
        },
        "quarterly_2": {
          "target": 6921720000.0,
          "actual": 176477024.0,
          "pct": 0.0255
        },
        "weekly_1_1": {
          "target": 247055840.0,
          "actual": 237216990.0,
          "pct": 0.9602
        },
        "weekly_1_2": {
          "target": 174091290.0,
          "actual": 205103856.0,
          "pct": 1.1781
        },
        "weekly_1_4": {
          "target": 0.8352,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 1.0,
          "pct": 1325792000.0
        },
        "weekly_1_6": {
          "target": 1314600880.0,
          "actual": 0.9916,
          "pct": 238550000.0
        },
        "weekly_2_1": {
          "target": 190958880.0,
          "actual": 0.8005,
          "pct": 238550000.0
        },
        "weekly_2_2": {
          "target": 207142000.0,
          "actual": 0.8683,
          "pct": 233870000.0
        },
        "weekly_2_3": {
          "target": 253786000.0,
          "actual": 1.0852,
          "pct": 276224000.0
        },
        "weekly_2_4": {
          "target": 235144000.0,
          "actual": 0.8513
        },
        "weekly_2_5": {
          "pct": 1.0
        },
        "weekly_3_1": {
          "target": 279760000.0,
          "actual": 210470000.0,
          "pct": 0.7523
        },
        "weekly_3_2": {
          "target": 240084000.0,
          "actual": 223808000.0,
          "pct": 0.9322
        },
        "weekly_3_3": {
          "target": 253656000.0,
          "actual": 251134000.0,
          "pct": 0.9901
        },
        "weekly_3_4": {
          "target": 276848000.0,
          "actual": 229866000.0,
          "pct": 0.8303
        },
        "weekly_3_5": {
          "actual": 93808000.0
        },
        "weekly_4_1": {
          "target": 243698000.0,
          "actual": 203424000.0,
          "pct": 0.8347
        },
        "weekly_4_2": {
          "target": 308594000.0,
          "actual": 184262000.0,
          "pct": 0.5971
        },
        "weekly_4_3": {
          "target": 238108000.0,
          "actual": 190086000.0,
          "pct": 0.7983
        },
        "weekly_4_4": {
          "target": 233324000.0,
          "actual": 206960000.0,
          "pct": 0.887
        },
        "weekly_4_5": {
          "target": 243360000.0,
          "actual": 140868000.0,
          "pct": 0.5788
        },
        "weekly_5_1": {
          "target": 346785716.0,
          "actual": 256273285.0,
          "pct": 0.739
        },
        "weekly_5_2": {
          "target": 320073702.0,
          "actual": 200311694.0,
          "pct": 0.6258
        },
        "weekly_5_3": {
          "target": 337637766.0,
          "actual": 189676209.0,
          "pct": 0.5618
        },
        "weekly_5_4": {
          "target": 337637766.0,
          "actual": 212206303.0,
          "pct": 0.6285
        },
        "weekly_6_1": {
          "target": 363644081.0,
          "actual": 186409084.0,
          "pct": 0.5126
        },
        "weekly_6_2": {
          "target": 327287514.0,
          "actual": 192880952.0,
          "pct": 0.5893
        },
        "weekly_6_3": {
          "target": 347177771.0,
          "actual": 189615019.0,
          "pct": 0.5462
        },
        "weekly_6_4": {
          "target": 238944454.0,
          "actual": 199296682.0,
          "pct": 0.8341
        },
        "weekly_7_1": {
          "target": 155714000.0,
          "actual": 176477024.0,
          "pct": 1.1333
        },
        "weekly_7_2": {
          "target": 266344000.0,
          "actual": 154934000.0,
          "pct": 0.5817
        },
        "weekly_7_3": {
          "target": 263172000.0,
          "actual": 158886000.0,
          "pct": 0.6037
        },
        "weekly_7_4": {
          "target": 253136000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "VM6-I03.02": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 1960560600.0,
          "actual": 716852540.0,
          "pct": 0.3656
        },
        "weekly_7_1": {
          "target": 155714000.0,
          "actual": 176477024.0,
          "pct": 1.1333
        },
        "weekly_7_2": {
          "target": 266344000.0,
          "actual": 154934000.0,
          "pct": 0.5817
        },
        "weekly_7_3": {
          "target": 263172000.0,
          "actual": 158886000.0,
          "pct": 0.6037
        },
        "weekly_7_4": {
          "target": 253136000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "DT nhóm MDA": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "DT nhóm English Stories": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 1610700000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.7096,
          "actual": 44385792.0,
          "pct": 45294250.0
        },
        "monthly_3": {
          "target": 260000000.0,
          "actual": 181038000.0,
          "pct": 0.6963
        },
        "monthly_4": {
          "target": 257140000.0,
          "actual": 128284000.0,
          "pct": 0.4989
        },
        "monthly_5": {
          "target": 294041250.0,
          "actual": 156822000.0,
          "pct": 0.5333
        },
        "monthly_6": {
          "target": 331678530.0,
          "actual": 136905606.0,
          "pct": 0.4128
        },
        "monthly_7": {
          "target": 392055000.0,
          "actual": 23863081.0,
          "pct": 0.0609
        },
        "yearly_2026": {
          "target": 504400000.0,
          "actual": 583828038.0,
          "pct": 1.1575
        },
        "quarterly_1": {
          "target": 879580000.0,
          "actual": 422011606.0,
          "pct": 0.4798
        },
        "quarterly_2": {
          "target": 1317160000.0,
          "actual": 23863081.0,
          "pct": 0.0181
        },
        "weekly_1_1": {
          "target": 34425600.0,
          "actual": 43092420.0,
          "pct": 1.2518
        },
        "weekly_1_2": {
          "target": 34458285.0,
          "actual": 61385064.0,
          "pct": 1.7814
        },
        "weekly_1_4": {
          "target": 1.0205,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 208000000.0
        },
        "weekly_1_6": {
          "target": 202928000.0,
          "actual": 0.9756,
          "pct": 52000000.0
        },
        "weekly_2_1": {
          "target": 39284000.0,
          "actual": 0.7555,
          "pct": 52000000.0
        },
        "weekly_2_2": {
          "target": 48802000.0,
          "actual": 0.9385,
          "pct": 47320000.0
        },
        "weekly_2_3": {
          "target": 66326000.0,
          "actual": 1.4016,
          "pct": 60658000.0
        },
        "weekly_2_4": {
          "target": 48516000.0,
          "actual": 0.7998
        },
        "weekly_3_1": {
          "target": 65000000.0,
          "actual": 39000000.0,
          "pct": 0.6
        },
        "weekly_3_2": {
          "target": 42900000.0,
          "actual": 40014000.0,
          "pct": 0.9327
        },
        "weekly_3_3": {
          "target": 42276000.0,
          "actual": 53248000.0,
          "pct": 1.2595
        },
        "weekly_3_4": {
          "target": 49270000.0,
          "actual": 34138000.0,
          "pct": 0.6929
        },
        "weekly_3_5": {
          "actual": 14638000.0
        },
        "weekly_4_1": {
          "target": 64298000.0,
          "actual": 33150000.0,
          "pct": 0.5156
        },
        "weekly_4_2": {
          "target": 46228000.0,
          "actual": 29796000.0,
          "pct": 0.6445
        },
        "weekly_4_3": {
          "target": 38480000.0,
          "actual": 24310000.0,
          "pct": 0.6318
        },
        "weekly_4_4": {
          "target": 29926000.0,
          "actual": 30316000.0,
          "pct": 1.013
        },
        "weekly_4_5": {
          "target": 32266000.0,
          "actual": 25350000.0,
          "pct": 0.7857
        },
        "weekly_5_1": {
          "target": 73523381.0,
          "actual": 54966111.0,
          "pct": 0.7476
        },
        "weekly_5_2": {
          "target": 55070659.0,
          "actual": 35206539.0,
          "pct": 0.6393
        },
        "weekly_5_3": {
          "target": 55070659.0,
          "actual": 33638319.0,
          "pct": 0.6108
        },
        "weekly_5_4": {
          "target": 55070659.0,
          "actual": 33011031.0,
          "pct": 0.5994
        },
        "weekly_6_1": {
          "target": 82932701.0,
          "actual": 30710975.0,
          "pct": 0.3703
        },
        "weekly_6_2": {
          "target": 59540086.0,
          "actual": 23460918.0,
          "pct": 0.394
        },
        "weekly_6_3": {
          "target": 59540086.0,
          "actual": 26676961.0,
          "pct": 0.4481
        },
        "weekly_6_4": {
          "target": 37454321.0,
          "actual": 32438074.0,
          "pct": 0.8661
        },
        "weekly_7_1": {
          "target": 78411000.0,
          "actual": 23863081.0,
          "pct": 0.3043
        },
        "weekly_7_2": {
          "target": 78411000.0,
          "pct": 0.0
        }
      }
    },
    "Kênh thương hiệu 1": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 754000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 39000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 52000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 70569900.0,
          "actual": 50000.0,
          "pct": 0.0007
        },
        "monthly_6": {
          "target": 91479500.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 91000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 356200000.0,
          "actual": 50000.0,
          "pct": 0.0001
        },
        "quarterly_2": {
          "target": 624000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 13000000.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_2": {
          "target": 14113980.0,
          "actual": 50000.0,
          "pct": 0.0035
        },
        "weekly_5_3": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 14113980.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Kênh sản phẩm AI": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 81600000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.9339,
          "actual": 4416647.0,
          "pct": 3758675.0
        },
        "monthly_3": {
          "target": 22600000.0,
          "actual": 16976527.0,
          "pct": 0.7512
        },
        "monthly_4": {
          "target": 22600000.0,
          "actual": 15870502.0,
          "pct": 0.7022
        },
        "monthly_5": {
          "target": 22500000.0,
          "actual": 16425498.0,
          "pct": 0.73
        },
        "monthly_6": {
          "target": 22150000.0,
          "actual": 16067990.0,
          "pct": 0.7254
        },
        "monthly_7": {
          "target": 22200000.0,
          "actual": 3706260.0,
          "pct": 0.1669
        },
        "yearly_2026": {
          "target": 66550000.0,
          "actual": 48972938.0,
          "pct": 0.7359
        },
        "quarterly_1": {
          "target": 72650000.0,
          "actual": 48363990.0,
          "pct": 0.6657
        },
        "quarterly_2": {
          "target": 78300000.0,
          "actual": 3706260.0,
          "pct": 0.0473
        },
        "weekly_1_1": {
          "target": 5848899.0,
          "actual": 5461548.0,
          "pct": 0.9338
        },
        "weekly_1_2": {
          "target": 4369238.0,
          "actual": 3576050.0,
          "pct": 0.8185
        },
        "weekly_1_4": {
          "target": 0.851,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 20233334.0
        },
        "weekly_1_6": {
          "target": 15359575.0,
          "actual": 0.7591,
          "pct": 5162500.0
        },
        "weekly_2_1": {
          "target": 3568809.0,
          "actual": 0.6913,
          "pct": 3925690.0
        },
        "weekly_2_2": {
          "target": 3618111.0,
          "actual": 0.9216,
          "pct": 4160828.0
        },
        "weekly_2_3": {
          "target": 4232934.0,
          "actual": 1.0173,
          "pct": 4867874.0
        },
        "weekly_2_4": {
          "target": 3939721.0,
          "actual": 0.8093
        },
        "weekly_3_1": {
          "target": 5337500.0,
          "actual": 3866956.0,
          "pct": 0.7245
        },
        "weekly_3_2": {
          "target": 3651170.0,
          "actual": 3694635.0,
          "pct": 1.0119
        },
        "weekly_3_3": {
          "target": 4248830.0,
          "actual": 3844750.0,
          "pct": 0.9049
        },
        "weekly_3_4": {
          "target": 4421462.0,
          "actual": 3899130.0,
          "pct": 0.8819
        },
        "weekly_3_5": {
          "actual": 1671056.0
        },
        "weekly_4_1": {
          "target": 5337500.0,
          "actual": 3799735.0,
          "pct": 0.7119
        },
        "weekly_4_2": {
          "target": 5737500.0,
          "actual": 3712668.0,
          "pct": 0.6471
        },
        "weekly_4_3": {
          "target": 4323208.0,
          "actual": 3590918.0,
          "pct": 0.8306
        },
        "weekly_4_4": {
          "target": 4129556.0,
          "actual": 3766250.0,
          "pct": 0.912
        },
        "weekly_4_5": {
          "target": 4331188.0,
          "actual": 2671987.0,
          "pct": 0.6169
        },
        "weekly_5_1": {
          "target": 5625000.0,
          "actual": 4563377.0,
          "pct": 0.8113
        },
        "weekly_5_2": {
          "target": 5625000.0,
          "actual": 3615736.0,
          "pct": 0.6428
        },
        "weekly_5_3": {
          "target": 5625000.0,
          "actual": 3515620.0,
          "pct": 0.625
        },
        "weekly_5_4": {
          "target": 5625000.0,
          "actual": 4058514.0,
          "pct": 0.7215
        },
        "weekly_6_1": {
          "target": 5537500.0,
          "actual": 3593814.0,
          "pct": 0.649
        },
        "weekly_6_2": {
          "target": 5537500.0,
          "actual": 3750191.0,
          "pct": 0.6772
        },
        "weekly_6_3": {
          "target": 5537500.0,
          "actual": 3570776.0,
          "pct": 0.6448
        },
        "weekly_6_4": {
          "target": 5537500.0,
          "actual": 3607246.0,
          "pct": 0.6514
        },
        "weekly_7_1": {
          "target": 4440000.0,
          "actual": 3706260.0,
          "pct": 0.8347
        },
        "weekly_7_2": {
          "target": 4440000.0,
          "pct": 0.0
        }
      }
    },
    "Kênh khai thác": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1560000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 351104000.0,
          "actual": 367016000.0,
          "pct": 1.0453
        },
        "monthly_4": {
          "target": 416000000.0,
          "actual": 394238000.0,
          "pct": 0.9477
        },
        "monthly_5": {
          "target": 418192000.0,
          "actual": 338761657.0,
          "pct": 0.8101
        },
        "monthly_6": {
          "target": 418192000.0,
          "actual": 324516992.0,
          "pct": 0.776
        },
        "monthly_7": {
          "target": 522740000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1339000000.0,
          "actual": 1214030640.0,
          "pct": 0.9067
        },
        "quarterly_1": {
          "target": 1456000000.0,
          "actual": 1057516649.0,
          "pct": 0.7263
        },
        "quarterly_2": {
          "target": 1560000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 418392000.0
        },
        "weekly_1_6": {
          "target": 427570000.0,
          "actual": 1.0219
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu chéo",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 156000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.607,
          "actual": 5850000.0,
          "pct": 5463120.0
        },
        "monthly_3": {
          "target": 49400000.0,
          "actual": 9343880.0,
          "pct": 0.1891
        },
        "monthly_4": {
          "target": 49400000.0,
          "actual": 17184880.0,
          "pct": 0.3479
        },
        "monthly_5": {
          "target": 52000000.0,
          "actual": 3700000.0,
          "pct": 0.0712
        },
        "monthly_6": {
          "target": 52000000.0,
          "actual": 62549454.0,
          "pct": 1.2029
        },
        "monthly_7": {
          "target": 52000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 148200000.0,
          "actual": 43329537.0,
          "pct": 0.2924
        },
        "quarterly_1": {
          "target": 156000000.0,
          "actual": 83434334.0,
          "pct": 0.5348
        },
        "quarterly_2": {
          "target": 156000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 5850000.0,
          "actual": 3618511.0,
          "pct": 0.6185
        },
        "weekly_1_2": {
          "target": 5850000.0,
          "actual": 2652106.0,
          "pct": 0.4534
        },
        "weekly_1_4": {
          "target": 0.9339,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 49400000.0
        },
        "weekly_1_6": {
          "target": 18700920.0,
          "actual": 0.3786,
          "pct": 12350000.0
        },
        "weekly_2_1": {
          "target": 4000000.0,
          "actual": 0.3239,
          "pct": 12350000.0
        },
        "weekly_2_2": {
          "target": 4366960.0,
          "actual": 0.3536,
          "pct": 12350000.0
        },
        "weekly_2_3": {
          "target": 5631080.0,
          "actual": 0.456,
          "pct": 12350000.0
        },
        "weekly_2_4": {
          "target": 4702880.0,
          "actual": 0.3808
        },
        "weekly_3_1": {
          "target": 12350000.0,
          "actual": 4296240.0,
          "pct": 0.3479
        },
        "weekly_3_2": {
          "target": 12350000.0,
          "actual": 5047640.0,
          "pct": 0.4087
        },
        "weekly_3_3": {
          "target": 12350000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 12350000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_5": {
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 9880000.0,
          "actual": 5029960.0,
          "pct": 0.5091
        },
        "weekly_4_3": {
          "target": 9880000.0,
          "actual": 4305000.0,
          "pct": 0.4357
        },
        "weekly_4_4": {
          "target": 9880000.0,
          "actual": 3889600.0,
          "pct": 0.3937
        },
        "weekly_4_5": {
          "target": 9880000.0,
          "actual": 3960320.0,
          "pct": 0.4008
        },
        "weekly_5_1": {
          "target": 13000000.0,
          "actual": 3700000.0,
          "pct": 0.2846
        },
        "weekly_5_2": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 9880000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 10400000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_3": {
          "target": 10400000.0
        }
      }
    },
    "Spotify": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.607,
          "actual": 5850000.0,
          "pct": 5463120.0
        },
        "monthly_3": {
          "target": 23400000.0,
          "actual": 9343880.0,
          "pct": 0.3993
        },
        "monthly_4": {
          "target": 23400000.0,
          "actual": 17184880.0,
          "pct": 0.7344
        },
        "monthly_5": {
          "target": 26000000.0,
          "actual": 3700000.0,
          "pct": 0.1423
        },
        "monthly_6": {
          "target": 26000000.0,
          "actual": 62549454.0,
          "pct": 2.4057
        },
        "monthly_7": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 70200000.0,
          "actual": 43329537.0,
          "pct": 0.6172
        },
        "quarterly_1": {
          "target": 78000000.0,
          "actual": 83434334.0,
          "pct": 1.0697
        },
        "quarterly_2": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 5850000.0,
          "actual": 3618511.0,
          "pct": 0.6185
        },
        "weekly_1_2": {
          "target": 5850000.0,
          "actual": 2652106.0,
          "pct": 0.4534
        },
        "weekly_1_4": {
          "target": 0.9339,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 23400000.0
        },
        "weekly_1_6": {
          "target": 18700920.0,
          "actual": 0.7992,
          "pct": 5850000.0
        },
        "weekly_2_1": {
          "target": 4000000.0,
          "actual": 0.6838,
          "pct": 5850000.0
        },
        "weekly_2_2": {
          "target": 4366960.0,
          "actual": 0.7465,
          "pct": 5850000.0
        },
        "weekly_2_3": {
          "target": 5631080.0,
          "actual": 0.9626,
          "pct": 5850000.0
        },
        "weekly_2_4": {
          "target": 4702880.0,
          "actual": 0.8039
        },
        "weekly_3_1": {
          "target": 5850000.0,
          "actual": 4296240.0,
          "pct": 0.7344
        },
        "weekly_3_2": {
          "target": 5850000.0,
          "actual": 5047640.0,
          "pct": 0.8628
        },
        "weekly_3_3": {
          "target": 5850000.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 5850000.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 4680000.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 4680000.0,
          "actual": 5029960.0,
          "pct": 1.0748
        },
        "weekly_4_3": {
          "target": 4680000.0,
          "actual": 4305000.0,
          "pct": 0.9199
        },
        "weekly_4_4": {
          "target": 4680000.0,
          "actual": 3889600.0,
          "pct": 0.8311
        },
        "weekly_4_5": {
          "target": 4680000.0,
          "actual": 3960320.0,
          "pct": 0.8462
        },
        "weekly_5_1": {
          "target": 6500000.0,
          "actual": 3700000.0,
          "pct": 0.5692
        },
        "weekly_5_2": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 4680000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 5200000.0,
          "pct": 0.0
        }
      }
    },
    "Doanh thu từ nền tảng youtube": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 26000000.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 26000000.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 26000000.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 26000000.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 26000000.0
        },
        "weekly_1_6": {
          "actual": 0.0,
          "pct": 6500000.0
        },
        "weekly_2_1": {
          "actual": 0.0,
          "pct": 6500000.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 6500000.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 6500000.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_5_2": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 5200000.0,
          "pct": 0.0
        }
      }
    },
    "VM1-I02.04": {
      "title": "",
      "unit": "Doanh thu đối tác",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.2198,
          "actual": 4550000.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 18200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 18200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 26000000.0,
          "actual": 21508472.0,
          "pct": 0.8272
        },
        "monthly_7": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 54600000.0,
          "actual": 2843725.0,
          "pct": 0.0521
        },
        "quarterly_1": {
          "target": 78000000.0,
          "actual": 21508472.0,
          "pct": 0.2757
        },
        "quarterly_2": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4550000.0,
          "actual": 762725.0,
          "pct": 0.1676
        },
        "weekly_1_2": {
          "target": 4550000.0,
          "actual": 1081000.0,
          "pct": 0.2376
        },
        "weekly_1_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 18200000.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 4550000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 4550000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 4550000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 4550000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_5": {
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 6500000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_2": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 3640000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 5200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 5200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_3": {
          "target": 5200000.0
        }
      }
    },
    "Doanh thu từ nguồn OTT": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.2198,
          "actual": 4550000.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 18200000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 18200000.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 26000000.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 26000000.0,
          "actual": 21508472.0,
          "pct": 0.8272
        },
        "monthly_7": {
          "target": 26000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 54600000.0,
          "actual": 2843725.0,
          "pct": 0.0521
        },
        "quarterly_1": {
          "target": 78000000.0,
          "actual": 21508472.0,
          "pct": 0.2757
        },
        "quarterly_2": {
          "target": 78000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4550000.0,
          "actual": 762725.0,
          "pct": 0.1676
        },
        "weekly_1_2": {
          "target": 4550000.0,
          "actual": 1081000.0,
          "pct": 0.2376
        },
        "weekly_1_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 18200000.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_1": {
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 4550000.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 4550000.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 4550000.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 4550000.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 4550000.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 6500000.0,
          "pct": 0.0
        },
        "weekly_5_2": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 3640000.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 5200000.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 5200000.0,
          "pct": 0.0
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.02": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 5000000.0,
          "actual": 0.0
        }
      }
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 148200000.0,
          "actual": 0.0
        }
      }
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.2227
        },
        "monthly_4": {
          "pct": 0.1803
        },
        "monthly_5": {
          "pct": 0.2575
        },
        "monthly_6": {
          "pct": 0.1992
        },
        "monthly_7": {
          "pct": 0.0835
        },
        "weekly_1_5": {
          "actual": 0.25
        },
        "weekly_1_6": {
          "actual": 0.2561
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.6
        },
        "monthly_4": {
          "pct": 0.606
        },
        "monthly_5": {
          "pct": 0.57
        },
        "monthly_6": {
          "pct": 0.57
        },
        "monthly_7": {
          "pct": 0.314
        },
        "weekly_1_5": {
          "actual": 0.6
        },
        "weekly_1_6": {
          "actual": 0.594
        },
        "weekly_2_5": {
          "pct": 0.6
        }
      }
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Chi phí CTV",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 114.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 8.0,
          "pct": 5.0
        },
        "monthly_3": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 25.0,
          "actual": 26.0,
          "pct": 1.04
        },
        "monthly_5": {
          "target": 23.0,
          "actual": 19.0,
          "pct": 0.8261
        },
        "monthly_6": {
          "target": 31.0,
          "actual": 23.0,
          "pct": 0.7419
        },
        "monthly_7": {
          "target": 33.0,
          "actual": 20.0,
          "pct": 0.6061
        },
        "yearly_2026": {
          "target": 84.0,
          "actual": 64.0,
          "pct": 0.7619
        },
        "quarterly_1": {
          "target": 95.0,
          "actual": 68.0,
          "pct": 0.7158
        },
        "quarterly_2": {
          "target": 113.0,
          "actual": 20.0,
          "pct": 0.177
        },
        "weekly_1_1": {
          "target": 6.0,
          "actual": 8.0,
          "pct": 1.3333
        },
        "weekly_1_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 0.625,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 18.0
        },
        "weekly_1_6": {
          "target": 17.0,
          "actual": 0.9444,
          "pct": 6.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 0.5,
          "pct": 6.0
        },
        "weekly_2_2": {
          "target": 7.0,
          "actual": 1.1667,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 7.0
        },
        "weekly_2_4": {
          "target": 7.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "weekly_3_2": {
          "target": 7.0,
          "actual": 6.0,
          "pct": 0.8571
        },
        "weekly_3_3": {
          "target": 6.0,
          "actual": 5.0,
          "pct": 0.8333
        },
        "weekly_3_4": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "actual": 2.0
        },
        "weekly_4_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "weekly_5_2": {
          "target": 5.0,
          "actual": 3.0,
          "pct": 0.6
        },
        "weekly_5_3": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 6.0,
          "actual": 5.0,
          "pct": 0.8333
        },
        "weekly_6_3": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 9.0,
          "actual": 4.0,
          "pct": 0.4444
        },
        "weekly_6_5": {
          "target": 5.0,
          "actual": 3.0,
          "pct": 0.6
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 8.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Doanh thu từ nền tảng youtube / facebook": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 59.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 5.0,
          "pct": 4.0
        },
        "monthly_3": {
          "target": 13.0,
          "actual": 13.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 18.0,
          "actual": 9.0,
          "pct": 0.5
        },
        "yearly_2026": {
          "target": 44.0,
          "actual": 35.0,
          "pct": 0.7955
        },
        "quarterly_1": {
          "target": 45.0,
          "actual": 45.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 58.0,
          "actual": 9.0,
          "pct": 0.1552
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 0.8,
          "actual": 0.0
        },
        "weekly_1_5": {
          "actual": 0.9,
          "pct": 8.0
        },
        "weekly_1_6": {
          "target": 8.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "actual": 0.3333,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 4.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.9
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 4.0,
          "actual": 3.0,
          "pct": 0.75
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 6.0,
          "actual": 7.0,
          "pct": 1.1667
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 5.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 4.0,
          "pct": 0.0
        }
      }
    },
    "Số lượng video hoàn thành sản xuất sản phẩm MDA": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 55.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "monthly_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 10.0,
          "actual": 11.0,
          "pct": 1.1
        },
        "monthly_5": {
          "target": 8.0,
          "actual": 4.0,
          "pct": 0.5
        },
        "monthly_6": {
          "target": 16.0,
          "actual": 8.0,
          "pct": 0.5
        },
        "monthly_7": {
          "target": 15.0,
          "actual": 11.0,
          "pct": 0.7333
        },
        "yearly_2026": {
          "target": 40.0,
          "actual": 29.0,
          "pct": 0.725
        },
        "quarterly_1": {
          "target": 50.0,
          "actual": 23.0,
          "pct": 0.46
        },
        "quarterly_2": {
          "target": 55.0,
          "actual": 11.0,
          "pct": 0.2
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 5.0,
          "pct": 1.6667
        },
        "weekly_1_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 0.3333,
          "actual": 0.0
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 10.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "actual": 0.9,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 2.0,
          "actual": 0.6667,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "actual": 1.3333,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 3.0
        },
        "weekly_2_4": {
          "target": 3.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.1
        },
        "weekly_3_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_3_2": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "weekly_3_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "weekly_6_3": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 5.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_5": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM2-I01.3": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Số lượng video hoàn thành sản xuất dự án English Stories",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0,
          "actual": 20.0,
          "pct": 0.5556
        },
        "weekly_7_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_3": {
          "target": 7.0,
          "actual": 5.0
        },
        "weekly_7_4": {
          "target": 9.0,
          "actual": 0.0
        }
      }
    },
    "Số lượng ý tưởng mới sx trong kỳ (áp dụng cho đơn vị sx có biên kịch)": {
      "title": "Số lượng ý tưởng mới",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_7": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 2.0,
          "pct": 0.5
        },
        "weekly_7_4": {
          "target": 6.0
        }
      }
    },
    "Sản phẩm MDA": {
      "title": "Số lượng ý tưởng mới",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_7": {
          "target": 5.0,
          "actual": 11.0,
          "pct": 0.7333
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 5.0,
          "pct": 1.6667
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 3.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 3.0,
          "pct": 0.0
        }
      }
    },
    "VM2-I01.4": {
      "title": "Số lượng ý tưởng mới",
      "unit": "Sản phẩm English Stories",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0,
          "actual": 20.0,
          "pct": 0.5556
        },
        "weekly_7_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_3": {
          "target": 7.0,
          "actual": 5.0
        },
        "weekly_7_4": {
          "target": 9.0,
          "actual": 0.0
        }
      }
    },
    "VM2-I01.5": {
      "title": "ROI",
      "unit": "Tỷ lệ chọn ý tưởng",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 0.9,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "VM2-I01.6": {
      "title": "SL Kịch bản mới SX",
      "unit": "Kịch bản",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 33.0,
          "actual": 11.0,
          "pct": 0.3333
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 5.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_7_4": {
          "target": 3.0,
          "actual": 0.0
        }
      }
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "target": 10.0,
          "pct": 0.2909
        },
        "monthly_4": {
          "target": 10.0,
          "pct": 0.1152
        },
        "monthly_5": {
          "target": 10.0,
          "pct": 0.46
        },
        "monthly_6": {
          "target": 10.0,
          "pct": 0.2267
        },
        "monthly_7": {
          "target": 10.0,
          "pct": 0.02
        },
        "weekly_1_5": {
          "actual": 0.4
        },
        "weekly_1_6": {
          "actual": 0.4304
        },
        "weekly_2_5": {
          "pct": 0.4
        }
      }
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM2-I02.02": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng X views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 20.0
        },
        "monthly_3": {
          "target": 11.0,
          "actual": 7.0,
          "pct": 0.6364
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 1.0,
          "pct": 0.1429
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 4.0,
          "pct": 0.8
        },
        "monthly_6": {
          "target": 6.0,
          "actual": 3.0,
          "pct": 0.5
        },
        "monthly_7": {
          "target": 6.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 20.0,
          "actual": 29.0,
          "pct": 1.45
        },
        "quarterly_1": {
          "target": 20.0,
          "actual": 8.0
        },
        "quarterly_2": {
          "target": 20.0
        },
        "weekly_1_5": {
          "actual": 0.75,
          "pct": 8.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "actual": 1.125
        },
        "weekly_2_5": {
          "pct": 0.75
        }
      }
    },
    "Số lượng ý tưởng được chọn sx trong kỳ (áp dụng cho đơn vị sx có biên kịch)": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng X views (youtube)",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_4": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.3333
        },
        "monthly_7": {
          "target": 3.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 6.0,
          "actual": 3.0
        }
      }
    },
    "TM3-I01.03": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video upload",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 51.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 3.0
        },
        "monthly_3": {
          "target": 13.0,
          "actual": 13.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 15.0,
          "actual": 13.0,
          "pct": 0.8667
        },
        "monthly_5": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 15.0,
          "actual": 14.0,
          "pct": 0.9333
        },
        "monthly_7": {
          "target": 15.0,
          "actual": 3.0,
          "pct": 0.2
        },
        "yearly_2026": {
          "target": 42.0,
          "actual": 41.0,
          "pct": 0.9762
        },
        "quarterly_1": {
          "target": 51.0,
          "actual": 42.0
        },
        "quarterly_2": {
          "target": 51.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "actual": 0.25,
          "pct": 14.0
        },
        "weekly_1_6": {
          "target": 13.0,
          "actual": 0.9286,
          "pct": 4.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_3": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_4": {
          "target": 2.0,
          "actual": 0.6667
        },
        "weekly_2_5": {
          "pct": 0.25
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "weekly_5_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 4.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_7_2": {
          "target": 4.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.2128
        },
        "monthly_4": {
          "pct": 0.1779
        },
        "monthly_5": {
          "pct": 0.1961
        },
        "monthly_6": {
          "pct": 0.097
        },
        "monthly_7": {
          "pct": 0.15
        },
        "weekly_1_5": {
          "actual": 0.25
        },
        "weekly_1_6": {
          "actual": 0.2014
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_5": {
          "actual": 0.0305
        }
      }
    },
    "SL video đạt ngưỡng đột biến Y views (youtube)": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic BP WF",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 107235088.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.8503,
          "actual": 5585864.0,
          "pct": 4659718.0
        },
        "monthly_3": {
          "target": 28850000.0,
          "actual": 20319617.0,
          "pct": 0.7043
        },
        "monthly_4": {
          "target": 28850000.0,
          "actual": 19101023.0,
          "pct": 0.6621
        },
        "monthly_5": {
          "target": 28600000.0,
          "actual": 19682948.0,
          "pct": 0.6882
        },
        "monthly_6": {
          "target": 29183333.0,
          "actual": 18876171.0,
          "pct": 0.6468
        },
        "monthly_7": {
          "target": 29700000.0,
          "actual": 29700000.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 80116665.0,
          "actual": 60207021.0,
          "pct": 0.7515
        },
        "quarterly_1": {
          "target": 92607738.0,
          "actual": 57660142.0,
          "pct": 0.6226
        },
        "quarterly_2": {
          "target": 102073039.0,
          "actual": 4715704.0,
          "pct": 0.0462
        },
        "weekly_1_1": {
          "target": 6778066.0,
          "actual": 6750774.0,
          "pct": 0.996
        },
        "weekly_1_2": {
          "target": 5502890.0,
          "actual": 4784179.0,
          "pct": 0.8694
        },
        "weekly_1_4": {
          "target": 0.8342,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.6,
          "pct": 26150000.0
        },
        "weekly_1_6": {
          "target": 18926040.0,
          "actual": 0.7237,
          "pct": 6641667.0
        },
        "weekly_2_1": {
          "target": 4347170.0,
          "actual": 0.6545,
          "pct": 4884284.0
        },
        "weekly_2_2": {
          "target": 4423972.0,
          "actual": 0.9058,
          "pct": 5191735.0
        },
        "weekly_2_3": {
          "target": 5265905.0,
          "actual": 1.0143,
          "pct": 6159958.0
        },
        "weekly_2_4": {
          "target": 4888993.0,
          "actual": 0.7937
        },
        "weekly_2_5": {
          "pct": 0.6
        },
        "weekly_3_1": {
          "target": 6900000.0,
          "actual": 4601051.0,
          "pct": 0.6668
        },
        "weekly_3_2": {
          "target": 4458675.0,
          "actual": 4441703.0,
          "pct": 0.9962
        },
        "weekly_3_3": {
          "target": 5107958.0,
          "actual": 4715247.0,
          "pct": 0.9231
        },
        "weekly_3_4": {
          "target": 5422534.0,
          "actual": 4593131.0,
          "pct": 0.847
        },
        "weekly_3_5": {
          "actual": 1968485.0
        },
        "weekly_4_1": {
          "target": 6900000.0,
          "actual": 4567742.0,
          "pct": 0.662
        },
        "weekly_4_2": {
          "target": 7225000.0,
          "actual": 4563116.0,
          "pct": 0.6316
        },
        "weekly_4_3": {
          "target": 5613723.0,
          "actual": 4252615.0,
          "pct": 0.7575
        },
        "weekly_4_4": {
          "target": 5203008.0,
          "actual": 4479171.0,
          "pct": 0.8609
        },
        "weekly_4_5": {
          "target": 5463547.0,
          "actual": 3206864.0,
          "pct": 0.587
        },
        "weekly_5_1": {
          "target": 7012500.0,
          "actual": 5636243.0,
          "pct": 0.8037
        },
        "weekly_5_2": {
          "target": 7012500.0,
          "actual": 4288093.0,
          "pct": 0.6115
        },
        "weekly_5_3": {
          "target": 7012500.0,
          "actual": 4197818.0,
          "pct": 0.5986
        },
        "weekly_5_4": {
          "target": 7012500.0,
          "actual": 4787295.0,
          "pct": 0.6827
        },
        "weekly_6_1": {
          "target": 7295833.0,
          "actual": 4199970.0,
          "pct": 0.5757
        },
        "weekly_6_2": {
          "target": 7295833.0,
          "actual": 4311162.0,
          "pct": 0.5909
        },
        "weekly_6_3": {
          "target": 7295833.0,
          "actual": 4213442.0,
          "pct": 0.5775
        },
        "weekly_6_4": {
          "target": 7295833.0,
          "actual": 4330206.0,
          "pct": 0.5935
        },
        "weekly_7_1": {
          "target": 3539286.0,
          "actual": 4715704.0,
          "pct": 1.3324
        },
        "weekly_7_2": {
          "target": 6800000.0,
          "actual": 4075191.0,
          "pct": 0.5993
        },
        "weekly_7_3": {
          "target": 6800000.0,
          "actual": 4049347.0,
          "pct": 0.5955
        },
        "weekly_7_4": {
          "target": 6800000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_5": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Traffic BP": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 17100000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.6666,
          "actual": 1065050.0,
          "pct": 901043.0
        },
        "monthly_3": {
          "target": 5000000.0,
          "actual": 3343090.0,
          "pct": 0.6686
        },
        "monthly_4": {
          "target": 5000000.0,
          "actual": 3230521.0,
          "pct": 0.6461
        },
        "monthly_5": {
          "target": 4300000.0,
          "actual": 3257450.0,
          "pct": 0.7575
        },
        "monthly_6": {
          "target": 4700000.0,
          "actual": 2808181.0,
          "pct": 0.5975
        },
        "monthly_7": {
          "target": 5000000.0,
          "actual": 1009444.0,
          "pct": 0.2019
        },
        "yearly_2026": {
          "target": 10900000.0,
          "actual": 11230104.0,
          "pct": 1.0303
        },
        "quarterly_1": {
          "target": 13500000.0,
          "actual": 9296152.0,
          "pct": 0.6886
        },
        "quarterly_2": {
          "target": 15800000.0,
          "actual": 1009444.0,
          "pct": 0.0639
        },
        "weekly_1_1": {
          "target": 825000.0,
          "actual": 1286856.0,
          "pct": 1.5598
        },
        "weekly_1_2": {
          "target": 1029485.0,
          "actual": 1208129.0,
          "pct": 1.1735
        },
        "weekly_1_4": {
          "target": 0.846,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 5500000.0
        },
        "weekly_1_6": {
          "target": 3564856.0,
          "actual": 0.6482,
          "pct": 1375000.0
        },
        "weekly_2_1": {
          "target": 776752.0,
          "actual": 0.5649,
          "pct": 854427.0
        },
        "weekly_2_2": {
          "target": 805861.0,
          "actual": 0.9432,
          "pct": 926740.0
        },
        "weekly_2_3": {
          "target": 1032971.0,
          "actual": 1.1146,
          "pct": 1187917.0
        },
        "weekly_2_4": {
          "target": 949272.0,
          "actual": 0.7991
        },
        "weekly_3_1": {
          "target": 1250000.0,
          "actual": 734095.0,
          "pct": 0.5873
        },
        "weekly_3_2": {
          "target": 807505.0,
          "actual": 747068.0,
          "pct": 0.9252
        },
        "weekly_3_3": {
          "target": 859128.0,
          "actual": 870497.0,
          "pct": 1.0132
        },
        "weekly_3_4": {
          "target": 1001072.0,
          "actual": 694001.0,
          "pct": 0.6933
        },
        "weekly_3_5": {
          "actual": 297429.0
        },
        "weekly_4_1": {
          "target": 1250000.0,
          "actual": 768007.0,
          "pct": 0.6144
        },
        "weekly_4_2": {
          "target": 1175000.0,
          "actual": 850448.0,
          "pct": 0.7238
        },
        "weekly_4_3": {
          "target": 978015.0,
          "actual": 661697.0,
          "pct": 0.6766
        },
        "weekly_4_4": {
          "target": 760952.0,
          "actual": 712921.0,
          "pct": 0.9369
        },
        "weekly_4_5": {
          "target": 819859.0,
          "actual": 534877.0,
          "pct": 0.6524
        },
        "weekly_5_1": {
          "target": 1075000.0,
          "actual": 1072866.0,
          "pct": 0.998
        },
        "weekly_5_2": {
          "target": 1075000.0,
          "actual": 672357.0,
          "pct": 0.6254
        },
        "weekly_5_3": {
          "target": 1075000.0,
          "actual": 682198.0,
          "pct": 0.6346
        },
        "weekly_5_4": {
          "target": 1075000.0,
          "actual": 728781.0,
          "pct": 0.6779
        },
        "weekly_6_1": {
          "target": 1175000.0,
          "actual": 606156.0,
          "pct": 0.5159
        },
        "weekly_6_2": {
          "target": 1175000.0,
          "actual": 560971.0,
          "pct": 0.4774
        },
        "weekly_6_3": {
          "target": 1175000.0,
          "actual": 642666.0,
          "pct": 0.5469
        },
        "weekly_6_4": {
          "target": 1175000.0,
          "actual": 722960.0,
          "pct": 0.6153
        },
        "weekly_7_1": {
          "target": 1000000.0,
          "actual": 1009444.0,
          "pct": 1.0094
        },
        "weekly_7_2": {
          "target": 1000000.0,
          "pct": 0.0
        }
      }
    },
    "Kênh thương hiệu": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 8535088.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.0,
          "actual": 104167.0
        },
        "monthly_3": {
          "target": 1250000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 1250000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 1800000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 2333333.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 2666665.0,
          "actual": 3979.0,
          "pct": 0.0015
        },
        "quarterly_1": {
          "target": 6457738.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 7973039.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 104167.0,
          "actual": 2370.0,
          "pct": 0.0228
        },
        "weekly_1_2": {
          "target": 104167.0,
          "pct": 0.0
        },
        "weekly_1_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 416666.0
        },
        "weekly_1_6": {
          "target": 1609.0,
          "actual": 0.0039,
          "pct": 104167.0
        },
        "weekly_2_1": {
          "target": 1609.0,
          "actual": 0.0154,
          "pct": 104167.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 104167.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 104167.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 312500.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_1": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_4_3": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_5_2": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_5_3": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_5_4": {
          "target": 312500.0,
          "pct": 0.0
        },
        "weekly_6_1": {
          "target": 583333.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_2": {
          "target": 583333.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_3": {
          "target": 583333.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 583333.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Kênh AI": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic sản phẩm MDA",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 29700000.0,
          "actual": 29700000.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 3539286.0,
          "actual": 4715704.0,
          "pct": 0.691
        },
        "weekly_7_2": {
          "target": 6800000.0,
          "actual": 4075191.0,
          "pct": 0.5993
        },
        "weekly_7_3": {
          "target": 6800000.0,
          "actual": 4049347.0,
          "pct": 0.5955
        },
        "weekly_7_4": {
          "target": 6800000.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Traffic long form video": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic sản phẩm MDA",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 0.0
        }
      }
    },
    "Traffic sản phẩm English Stories": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM3-I01.04": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 7.0,
          "actual": 8.0,
          "pct": 1.1429
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 6.0,
          "pct": 0.8571
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.07,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 7.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "VM3-I01.05": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 5.0,
          "pct": 0.7143
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 6.0,
          "pct": 0.8571
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.07,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 6.0,
          "actual": 0.8571
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.0788
        },
        "monthly_4": {
          "pct": 0.0788
        },
        "monthly_5": {
          "pct": 0.0675
        },
        "monthly_6": {
          "pct": 0.0675
        },
        "weekly_1_5": {
          "actual": 0.1
        },
        "weekly_1_6": {
          "actual": 0.117
        },
        "weekly_2_5": {
          "pct": 0.1
        }
      }
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.1
        }
      }
    },
    "Traffic short": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt ngưỡng 5k$/ tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 8.0,
          "actual": 7.0,
          "pct": 0.875
        },
        "monthly_4": {
          "target": 8.0,
          "actual": 7.0,
          "pct": 0.875
        },
        "monthly_5": {
          "target": 8.0,
          "actual": 6.0,
          "pct": 0.75
        },
        "monthly_6": {
          "target": 8.0,
          "actual": 6.0,
          "pct": 0.75
        },
        "monthly_7": {
          "target": 8.0,
          "actual": 6.0,
          "pct": 0.75
        },
        "yearly_2026": {
          "target": 4.0,
          "actual": 8.0,
          "pct": 2.0
        },
        "quarterly_1": {
          "target": 8.0,
          "actual": 7.0,
          "pct": 0.875
        },
        "weekly_1_5": {
          "actual": 0.9,
          "pct": 6.0
        },
        "weekly_1_6": {
          "target": 8.0,
          "actual": 1.3
        },
        "weekly_2_5": {
          "pct": 0.9
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.6154,
          "pct": 0.6154
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 7.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.03": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 3.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 3.0,
          "actual": 1.0
        }
      }
    },
    "Số kênh kinh doanh mở mới trong kỳ": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh trả lại",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 23.0,
          "actual": 23.0,
          "pct": 1.0
        }
      }
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 23.0,
          "actual": 23.0,
          "pct": 1.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.0539
        },
        "monthly_4": {
          "pct": 0.0471
        },
        "monthly_5": {
          "pct": 0.0447
        },
        "monthly_6": {
          "pct": 0.0434
        },
        "monthly_7": {
          "pct": 0.0091
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.0563
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0
        },
        "monthly_5": {
          "target": 0.0
        },
        "monthly_6": {
          "target": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 1.0
        },
        "quarterly_1": {
          "target": 1.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_5": {
          "pct": 0.0
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "pct": 1.0783
        },
        "monthly_4": {
          "pct": 0.9412
        },
        "monthly_5": {
          "pct": 0.8945
        },
        "monthly_6": {
          "pct": 0.8676
        },
        "monthly_7": {
          "pct": 0.1828
        },
        "weekly_1_5": {
          "actual": 1.0
        },
        "weekly_1_6": {
          "actual": 1.1264
        },
        "weekly_2_5": {
          "pct": 1.0
        }
      }
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 22.0,
          "actual": 22.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 22.0,
          "actual": 21.0,
          "pct": 0.9545
        },
        "monthly_5": {
          "target": 20.0,
          "actual": 19.5,
          "pct": 0.975
        },
        "monthly_6": {
          "target": 20.0,
          "actual": 19.5,
          "pct": 0.975
        },
        "monthly_7": {
          "target": 20.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 21.0,
          "actual": 22.0
        },
        "quarterly_1": {
          "target": 19.0,
          "actual": 19.5
        },
        "weekly_1_5": {
          "actual": 0.5,
          "pct": 22.0
        },
        "weekly_1_6": {
          "target": 22.0,
          "actual": 1.0233
        },
        "weekly_2_5": {
          "pct": 0.5
        }
      }
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 378560000.0
        },
        "monthly_3": {
          "target": 70254476.0,
          "actual": 91740133.0,
          "pct": 1.3058
        },
        "monthly_4": {
          "target": 81825714.0,
          "actual": 85725609.0,
          "pct": 1.0477
        },
        "monthly_5": {
          "target": 86837071.0,
          "actual": 79815277.0,
          "pct": 0.9191
        },
        "monthly_6": {
          "target": 89849049.0,
          "actual": 77119682.0,
          "pct": 0.8583
        },
        "monthly_7": {
          "target": 85241765.0,
          "actual": 31167502.0,
          "pct": 0.3656
        },
        "yearly_2026": {
          "target": 203560500.0,
          "actual": 202686539.0,
          "pct": 0.9957
        },
        "quarterly_1": {
          "target": 284758500.0,
          "actual": 240738750.0
        },
        "quarterly_2": {
          "target": 346086000.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 63132952.0
        },
        "weekly_1_6": {
          "target": 87640059.0,
          "actual": 1.3882
        },
        "weekly_2_5": {
          "pct": 0.3
        }
      }
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1514240000.0
        },
        "monthly_3": {
          "target": 491781333.0,
          "actual": 458700667.0,
          "pct": 0.9327
        },
        "monthly_4": {
          "target": 572780000.0,
          "actual": 428628047.0,
          "pct": 0.7483
        },
        "monthly_5": {
          "target": 607859497.0,
          "actual": 399076383.0,
          "pct": 0.6565
        },
        "monthly_6": {
          "target": 628943343.0,
          "actual": 385598412.0,
          "pct": 0.6131
        },
        "monthly_7": {
          "target": 653520200.0,
          "actual": 238950847.0,
          "pct": 0.3656
        },
        "yearly_2026": {
          "target": 814242000.0,
          "actual": 1351243591.0,
          "pct": 1.6595
        },
        "quarterly_1": {
          "target": 1139034000.0,
          "actual": 1203693750.0
        },
        "quarterly_2": {
          "target": 1384344000.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 441930667.0
        },
        "weekly_1_6": {
          "target": 438200293.0,
          "actual": 0.9916
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "Số vi phạm chính sách",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.05
        },
        "monthly_4": {
          "pct": 0.05
        },
        "monthly_5": {
          "pct": 0.05
        },
        "monthly_6": {
          "pct": 0.05
        },
        "monthly_7": {
          "pct": 0.05
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.05
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_5": {
          "actual": 0.8,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.8
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.75,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.75,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.75,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.75,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.75,
          "actual": 1.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.8,
          "actual": 1.0,
          "pct": 1.25
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 0.75
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.2
        }
      }
    },
    "VM6-I02": {
      "title": "",
      "unit": "Số lượng nhân sự fulltime",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 15.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.05
        },
        "monthly_4": {
          "pct": 0.05
        },
        "monthly_5": {
          "pct": 0.05
        },
        "monthly_6": {
          "pct": 0.05
        },
        "monthly_7": {
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.05
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.3
        }
      }
    },
    "TM7-I02": {
      "title": "ROI",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.3
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.95,
          "actual": 0.96,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.95,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.85,
          "actual": 0.95,
          "pct": 0.95
        },
        "quarterly_1": {
          "target": 0.85
        },
        "weekly_1_5": {
          "actual": 1.0,
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.95,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 1.0
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 5.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 5.0,
          "actual": 7.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 5.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 15.0,
          "actual": 19.0
        },
        "quarterly_1": {
          "target": 10.0
        },
        "weekly_1_5": {
          "pct": 5.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "actual": 0.0
        }
      }
    }
  },
  "NDTH": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "target": 0.6904,
          "actual": -42.25,
          "pct": -61.2
        },
        "weekly_7_1": {
          "actual": 0.9856
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "target": 0.4084,
          "actual": 549984878.0,
          "pct": 463793165.0
        },
        "weekly_1_5": {
          "pct": 1.1576
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "2.1": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_2": {
          "target": 0.3,
          "actual": 190263422.0
        },
        "monthly_3": {
          "target": 839164994.0,
          "actual": 447062668.0,
          "pct": 0.53
        },
        "monthly_4": {
          "target": 864756172.0,
          "actual": 307136660.0,
          "pct": 0.36
        },
        "monthly_5": {
          "target": 890638235.0,
          "actual": 276027193.0,
          "pct": 0.3099
        },
        "monthly_6": {
          "target": 930365937.0,
          "actual": 373844969.0,
          "pct": 0.4
        },
        "monthly_7": {
          "target": 550000000.0,
          "pct": 0.58
        },
        "yearly_2026": {
          "target": 2406200581.0,
          "actual": 1051927424.0,
          "pct": 0.44
        },
        "quarterly_1": {
          "target": 2685828360.0,
          "actual": 933521834.0,
          "pct": 0.35
        },
        "quarterly_2": {
          "target": 1850000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 190263422.0,
          "actual": 65807272.0,
          "pct": 0.35
        },
        "weekly_1_2": {
          "target": 190263422.0,
          "actual": 63996000.0,
          "pct": 0.34
        },
        "weekly_1_4": {
          "target": 0.4
        },
        "weekly_1_5": {
          "pct": 805269899.0
        },
        "weekly_1_6": {
          "target": 367315387.0,
          "actual": 0.46,
          "pct": 201317474.8
        },
        "weekly_2_1": {
          "target": 86134545.0,
          "actual": 0.4279,
          "pct": 201317474.8
        },
        "weekly_2_2": {
          "target": 84653528.0,
          "actual": 0.4205,
          "pct": 201317474.8
        },
        "weekly_2_3": {
          "target": 101578648.0,
          "actual": 0.5,
          "pct": 201317474.8
        },
        "weekly_2_4": {
          "target": 87964211.0,
          "actual": 0.4369
        },
        "weekly_2_5": {
          "actual": 421000000.0
        },
        "weekly_3_1": {
          "target": 209791249.0,
          "actual": 89312668.0,
          "pct": 0.43
        },
        "weekly_3_2": {
          "target": 209791249.0,
          "actual": 101199609.0,
          "pct": 0.48
        },
        "weekly_3_3": {
          "target": 209791249.0,
          "actual": 111040447.0,
          "pct": 0.53
        },
        "weekly_3_4": {
          "target": 209791249.0,
          "actual": 81227181.0,
          "pct": 0.3872
        },
        "weekly_4_1": {
          "target": 294650023.0,
          "actual": 110663518.0,
          "pct": 0.3756
        },
        "weekly_4_2": {
          "target": 294650023.0,
          "actual": 95045595.0,
          "pct": 0.3226
        },
        "weekly_4_3": {
          "target": 294650023.0,
          "actual": 72163437.0,
          "pct": 0.2449
        },
        "weekly_4_4": {
          "target": 294650023.0,
          "actual": 66163437.0,
          "pct": 0.2245
        },
        "weekly_4_5": {
          "target": 294650023.0,
          "pct": 373430200.0
        },
        "weekly_5_1": {
          "target": 222659559.0,
          "actual": 72626982.0,
          "pct": 0.3262
        },
        "weekly_5_2": {
          "target": 222659559.0,
          "actual": 75725568.0,
          "pct": 0.3401
        },
        "weekly_5_3": {
          "target": 222676563.0,
          "actual": 66577269.0,
          "pct": 0.299
        },
        "weekly_5_4": {
          "target": 222676563.0
        },
        "weekly_5_5": {
          "pct": 276027193.0
        },
        "weekly_6_1": {
          "target": 232591484.0,
          "actual": 70300000.0,
          "pct": 0.3022
        },
        "weekly_6_2": {
          "target": 232591484.0,
          "actual": 81117039.0,
          "pct": 0.3488
        },
        "weekly_6_3": {
          "target": 232591484.0,
          "actual": 105419227.0,
          "pct": 0.4532
        },
        "weekly_6_4": {
          "target": 232591484.0,
          "actual": 103000000.0,
          "pct": 0.4428
        },
        "weekly_7_1": {
          "target": 137500000.0,
          "actual": 96801406.0,
          "pct": 0.704
        },
        "weekly_7_2": {
          "target": 137500000.0,
          "actual": 110425866.0,
          "pct": 0.803
        },
        "weekly_7_3": {
          "target": 137500000.0,
          "actual": 110532786.0,
          "pct": 0.8039
        },
        "weekly_7_4": {
          "target": 137500000.0
        }
      }
    },
    "TBP": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.95,
          "actual": 6750000.0,
          "pct": 6685231.0
        },
        "monthly_3": {
          "target": 43000000.0,
          "actual": 58257892.0,
          "pct": 1.3548
        },
        "monthly_4": {
          "target": 43000000.0,
          "actual": 40856142.0,
          "pct": 0.9501
        },
        "monthly_5": {
          "target": 50000000.0,
          "actual": 31242840.0,
          "pct": 0.6249
        },
        "monthly_6": {
          "target": 50000000.0,
          "actual": 48593741.0,
          "pct": 0.9719
        },
        "monthly_7": {
          "target": 53500000.0
        },
        "yearly_2026": {
          "target": 70105000.0,
          "actual": 128802179.0,
          "pct": 1.84
        },
        "quarterly_1": {
          "target": 74279000.0
        },
        "weekly_1_1": {
          "target": 6750000.0,
          "actual": 6026758.0,
          "pct": 0.89
        },
        "weekly_1_2": {
          "target": 6750000.0,
          "actual": 5447329.0,
          "pct": 0.81
        },
        "weekly_1_4": {
          "target": 0.99
        },
        "weekly_1_5": {
          "pct": 30000000.0
        },
        "weekly_1_6": {
          "target": 38905526.0,
          "actual": 1.3,
          "pct": 7500000.0
        },
        "weekly_2_1": {
          "target": 7144312.0,
          "actual": 0.9526,
          "pct": 7500000.0
        },
        "weekly_2_2": {
          "target": 11706413.0,
          "actual": 1.5609,
          "pct": 7500000.0
        },
        "weekly_2_3": {
          "target": 10698965.0,
          "actual": 1.43,
          "pct": 7500000.0
        },
        "weekly_2_4": {
          "target": 11329196.0,
          "actual": 1.51
        },
        "weekly_2_5": {
          "actual": 0.5017
        },
        "weekly_3_1": {
          "target": 10750000.0,
          "actual": 19381145.0,
          "pct": 1.8029
        },
        "weekly_3_2": {
          "target": 10750000.0,
          "actual": 20004362.0,
          "pct": 1.8609
        },
        "weekly_3_3": {
          "target": 10750000.0,
          "actual": 11940844.0,
          "pct": 1.1108
        },
        "weekly_3_4": {
          "target": 10750000.0,
          "actual": 5827325.0,
          "pct": 0.5421
        },
        "weekly_4_1": {
          "target": 10750000.0,
          "actual": 7874184.0,
          "pct": 0.7325
        },
        "weekly_4_2": {
          "target": 10750000.0,
          "actual": 11743075.0,
          "pct": 1.0924
        },
        "weekly_4_3": {
          "target": 10750000.0,
          "actual": 10733305.0,
          "pct": 0.9984
        },
        "weekly_4_4": {
          "target": 10750000.0,
          "actual": 11071546.0,
          "pct": 1.0299
        },
        "weekly_4_5": {
          "target": 10750000.0,
          "pct": 48593741.0
        },
        "weekly_5_1": {
          "target": 12500000.0,
          "actual": 9220884.0,
          "pct": 0.7377
        },
        "weekly_5_2": {
          "target": 12500000.0,
          "actual": 10733305.0,
          "pct": 0.8587
        },
        "weekly_5_3": {
          "target": 12500000.0,
          "actual": 7872456.0,
          "pct": 0.6298
        },
        "weekly_5_4": {
          "target": 12500000.0
        },
        "weekly_6_1": {
          "target": 12500000.0,
          "actual": 10470915.0,
          "pct": 0.8377
        },
        "weekly_6_2": {
          "target": 12500000.0,
          "actual": 12152738.0,
          "pct": 0.9722
        },
        "weekly_6_3": {
          "target": 12500000.0,
          "actual": 13772567.0,
          "pct": 1.1
        },
        "weekly_6_4": {
          "target": 12500000.0,
          "actual": 12766980.0,
          "pct": 1.0214
        },
        "weekly_7_1": {
          "target": 14250000.0,
          "actual": 11426470.0,
          "pct": 0.8
        },
        "weekly_7_2": {
          "target": 14250000.0,
          "actual": 13952408.0,
          "pct": 0.9791
        },
        "weekly_7_3": {
          "target": 14250000.0,
          "actual": 13367418.0,
          "pct": 0.9381
        },
        "weekly_7_4": {
          "target": 14250000.0
        }
      }
    },
    "36,011,890 ₫": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.48,
          "actual": 900000.0,
          "pct": 448422.0
        },
        "monthly_3": {
          "target": 4209500.0,
          "actual": 2215318.0,
          "pct": 0.5263
        },
        "monthly_4": {
          "target": 313843920.0
        },
        "monthly_5": {
          "target": 325855920.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 27500000.0,
          "actual": 6296547.0,
          "pct": 0.23
        },
        "quarterly_1": {
          "target": 989375010.0
        },
        "weekly_1_1": {
          "target": 900000.0,
          "actual": 626927.0,
          "pct": 0.7
        },
        "weekly_1_2": {
          "target": 900000.0,
          "actual": 542103.0,
          "pct": 0.6
        },
        "weekly_1_4": {
          "target": 0.5
        },
        "weekly_1_5": {
          "pct": 3865000.0
        },
        "weekly_1_6": {
          "target": 1935645.0,
          "actual": 0.5,
          "pct": 966250.0
        },
        "weekly_2_1": {
          "target": 364748.0,
          "actual": 0.3775,
          "pct": 966250.0
        },
        "weekly_2_2": {
          "target": 442874.0,
          "actual": 0.4583,
          "pct": 966250.0
        },
        "weekly_2_3": {
          "target": 424307.0,
          "actual": 0.44,
          "pct": 966250.0
        },
        "weekly_2_4": {
          "target": 429810.0,
          "actual": 0.44
        },
        "weekly_3_1": {
          "target": 1052375.0,
          "actual": 535023.0,
          "pct": 0.5084
        },
        "weekly_3_2": {
          "target": 1052375.0,
          "actual": 444573.0,
          "pct": 0.4224
        },
        "weekly_3_3": {
          "target": 1052375.0,
          "actual": 499836.0,
          "pct": 0.475
        },
        "weekly_3_4": {
          "target": 1052375.0,
          "actual": 393540.0,
          "pct": 0.374
        },
        "weekly_4_1": {
          "target": 78460980.0,
          "pct": 0.0
        },
        "weekly_5_1": {
          "target": 81463980.0
        },
        "weekly_5_2": {
          "target": 81463980.0
        },
        "weekly_5_3": {
          "target": 81463980.0
        },
        "weekly_5_4": {
          "target": 81463980.0
        },
        "weekly_6_3": {
          "pct": 1.33,
          "target": 1000000.0,
          "actual": 1334041.0
        },
        "monthly_7": {
          "pct": 0.832
        },
        "weekly_4_5": {
          "pct": 48593741.0
        },
        "weekly_6_1": {
          "target": 1000000.0,
          "actual": 551254.0,
          "pct": 0.5513
        },
        "weekly_6_2": {
          "target": 1000000.0,
          "actual": 726032.0,
          "pct": 0.726
        },
        "weekly_6_4": {
          "target": 1000000.0,
          "actual": 967556.0,
          "pct": 0.9676
        }
      }
    },
    "12,512,783 ₫": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.23,
          "actual": 1950000.0,
          "pct": 763909.0
        },
        "monthly_3": {
          "target": 8000000.0,
          "actual": 4385826.0,
          "pct": 0.5482
        },
        "monthly_4": {
          "target": 5500000.0,
          "actual": 2233573.0,
          "pct": 0.4061
        },
        "monthly_5": {
          "target": 4000000.0,
          "actual": 2404858.0,
          "pct": 0.6012
        },
        "yearly_2026": {
          "target": 11674500.0,
          "actual": 6752264.0,
          "pct": 0.58
        },
        "quarterly_1": {
          "target": 16412346.0
        },
        "weekly_1_1": {
          "target": 1950000.0,
          "actual": 1353575.0,
          "pct": 0.69
        },
        "weekly_1_2": {
          "target": 1950000.0,
          "actual": 472019.0,
          "pct": 0.24
        },
        "weekly_1_4": {
          "target": 0.39
        },
        "weekly_1_5": {
          "pct": 6000000.0
        },
        "weekly_1_6": {
          "target": 4638928.0,
          "actual": 0.77,
          "pct": 1500000.0
        },
        "weekly_2_1": {
          "target": 997839.0,
          "actual": 0.6652,
          "pct": 1500000.0
        },
        "weekly_2_2": {
          "target": 1318463.0,
          "actual": 0.879,
          "pct": 1500000.0
        },
        "weekly_2_3": {
          "target": 1486716.0,
          "actual": 0.99,
          "pct": 1500000.0
        },
        "weekly_2_4": {
          "target": 1234288.0,
          "actual": 0.82
        },
        "weekly_3_1": {
          "target": 2000000.0,
          "actual": 877224.0,
          "pct": 0.4386
        },
        "weekly_3_2": {
          "target": 2000000.0,
          "actual": 886780.0,
          "pct": 0.4434
        },
        "weekly_3_3": {
          "target": 2000000.0,
          "actual": 1542825.0,
          "pct": 0.7714
        },
        "weekly_3_4": {
          "target": 2000000.0,
          "actual": 1078997.0,
          "pct": 0.5395
        },
        "weekly_4_1": {
          "target": 1375000.0,
          "actual": 867831.0,
          "pct": 0.6311
        },
        "weekly_4_2": {
          "target": 1375000.0,
          "actual": 648874.0,
          "pct": 0.4719
        },
        "weekly_4_3": {
          "target": 1375000.0,
          "actual": 335028.0,
          "pct": 0.2437
        },
        "weekly_4_4": {
          "target": 1375000.0,
          "actual": 518686.0,
          "pct": 0.3772
        },
        "weekly_4_5": {
          "target": 1375000.0,
          "pct": 48593741.0
        },
        "weekly_5_1": {
          "target": 1000000.0,
          "actual": 500000.0,
          "pct": 0.5
        },
        "weekly_5_2": {
          "target": 1000000.0,
          "actual": 335028.0,
          "pct": 0.335
        },
        "weekly_5_3": {
          "target": 1000000.0,
          "actual": 345559.0,
          "pct": 0.3456
        },
        "weekly_5_4": {
          "target": 1000000.0
        },
        "weekly_6_3": {
          "pct": 0.0
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu nội bộ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.3,
          "actual": 190263422.0
        },
        "monthly_3": {
          "target": 839164994.0,
          "actual": 447062668.0,
          "pct": 0.5327
        },
        "monthly_4": {
          "target": 864756172.0,
          "actual": 307136660.0,
          "pct": 0.3552
        },
        "monthly_5": {
          "target": 890638235.0,
          "actual": 276027193.0,
          "pct": 0.3099
        },
        "monthly_6": {
          "target": 930365937.0,
          "actual": 373430200.0,
          "pct": 0.4
        },
        "monthly_7": {
          "target": 550000000.0
        },
        "yearly_2026": {
          "target": 2406200581.0,
          "actual": 1051927424.0,
          "pct": 0.44
        },
        "quarterly_1": {
          "target": 2685828360.0,
          "actual": 933521834.0,
          "pct": 0.3476
        },
        "quarterly_2": {
          "target": 1850000000.0
        },
        "weekly_1_1": {
          "target": 190263422.0,
          "actual": 65807272.0
        },
        "weekly_1_2": {
          "target": 190263422.0,
          "actual": 63996000.0,
          "pct": 0.34
        },
        "weekly_1_5": {
          "pct": 805269899.0
        },
        "weekly_1_6": {
          "target": 367315387.0,
          "actual": 0.46,
          "pct": 201317474.8
        },
        "weekly_2_1": {
          "target": 86134545.0,
          "actual": 0.4279,
          "pct": 201317474.8
        },
        "weekly_2_2": {
          "target": 84653528.0,
          "actual": 0.4205,
          "pct": 201317474.8
        },
        "weekly_2_3": {
          "target": 101578648.0,
          "actual": 0.5,
          "pct": 201317474.8
        },
        "weekly_2_4": {
          "target": 87964211.0,
          "actual": 0.4369
        },
        "weekly_3_1": {
          "target": 209791249.0,
          "actual": 89312668.0,
          "pct": 0.43
        },
        "weekly_3_2": {
          "target": 209791249.0,
          "actual": 101199609.0,
          "pct": 0.48
        },
        "weekly_3_3": {
          "target": 209791249.0,
          "actual": 111040447.0,
          "pct": 0.53
        },
        "weekly_3_4": {
          "target": 209791249.0,
          "actual": 81227181.0,
          "pct": 0.3872
        },
        "weekly_4_1": {
          "target": 294650023.0,
          "actual": 110663518.0,
          "pct": 0.3756
        },
        "weekly_4_2": {
          "target": 216189043.0,
          "actual": 95045595.0
        },
        "weekly_4_3": {
          "target": 216189043.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 216189043.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 216189043.0
        },
        "weekly_5_1": {
          "target": 222659559.0,
          "actual": 72626982.0,
          "pct": 0.3262
        },
        "weekly_5_2": {
          "target": 222659559.0,
          "actual": 75725568.0,
          "pct": 0.3401
        },
        "weekly_5_3": {
          "target": 222676563.0,
          "actual": 66577269.0,
          "pct": 0.299
        },
        "weekly_5_4": {
          "target": 222676563.0
        },
        "weekly_6_1": {
          "target": 232591484.0,
          "actual": 70300000.0,
          "pct": 0.3022
        },
        "weekly_6_2": {
          "target": 232591484.0,
          "actual": 81117039.0,
          "pct": 0.3488
        },
        "weekly_6_3": {
          "target": 232591484.0,
          "actual": 105419227.0,
          "pct": 0.4532
        },
        "weekly_6_4": {
          "target": 232591484.0,
          "actual": 103000000.0,
          "pct": 0.4428
        },
        "weekly_7_1": {
          "target": 137500000.0,
          "actual": 96801406.0
        },
        "weekly_7_2": {
          "target": 137500000.0,
          "actual": 110425866.0,
          "pct": 0.803
        },
        "weekly_7_3": {
          "target": 137500000.0,
          "actual": 110532786.0,
          "pct": 0.8039
        },
        "weekly_7_4": {
          "target": 137500000.0
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu chéo",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "weekly_1_1": {
          "target": 61000000.0,
          "actual": 20761850.0
        },
        "weekly_1_2": {
          "target": 61000000.0,
          "actual": 25540000.0
        }
      }
    },
    "VM1-I02.04": {
      "title": "",
      "unit": "Doanh thu đối tác",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "actual": 1821775577.0
        },
        "quarterly_1": {
          "actual": 1477571208.0
        },
        "quarterly_2": {
          "target": 1328228064.0
        }
      }
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "target": 1007113182.0,
          "actual": 1119272774.0,
          "pct": 0.9
        },
        "quarterly_1": {
          "target": 1406681011.0,
          "actual": 0.6902
        },
        "quarterly_2": {
          "target": 0.64
        }
      }
    },
    "VM1-I05.02": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "actual": 3970681.0
        }
      }
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí mua công cụ AI phân bổ hàng tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.33,
          "actual": 9.0
        },
        "monthly_3": {
          "target": 32.0,
          "actual": 33.0,
          "pct": 1.0313
        },
        "monthly_4": {
          "target": 28.0,
          "actual": 32.0,
          "pct": 1.14
        },
        "monthly_5": {
          "target": 49.0,
          "actual": 50.0,
          "pct": 1.0204
        },
        "monthly_6": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 11.0
        },
        "yearly_2026": {
          "target": 107.0,
          "actual": 107.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 66.0,
          "actual": 98.0,
          "pct": 1.4848
        },
        "quarterly_2": {
          "target": 33.0
        },
        "weekly_1_1": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 9.0,
          "actual": 5.0,
          "pct": 0.56
        },
        "weekly_1_4": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 32.0
        },
        "weekly_1_6": {
          "target": 34.0,
          "actual": 1.0625,
          "pct": 8.0
        },
        "weekly_2_1": {
          "target": 9.0,
          "actual": 1.13,
          "pct": 8.0
        },
        "weekly_2_2": {
          "target": 10.0,
          "pct": 8.0
        },
        "weekly_2_3": {
          "target": 12.0,
          "actual": 1.5,
          "pct": 8.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 7.0,
          "actual": 8.0,
          "pct": 1.1429
        },
        "weekly_4_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 7.0
        },
        "weekly_5_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "weekly_7_1": {
          "target": 2.75,
          "actual": 3.0,
          "pct": 1.09
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 2.0
        }
      }
    },
    "14,272,453 ₫": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video hoàn thành biên tập",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.14,
          "actual": 117.0
        },
        "monthly_3": {
          "target": 420.0,
          "actual": 443.0,
          "pct": 1.0548
        },
        "monthly_4": {
          "target": 381.0,
          "actual": 447.0,
          "pct": 1.17
        },
        "monthly_5": {
          "target": 320.0,
          "actual": 500.0,
          "pct": 1.5625
        },
        "monthly_6": {
          "target": 414.0,
          "actual": 456.0,
          "pct": 1.1014
        },
        "monthly_7": {
          "target": 420.0
        },
        "yearly_2026": {
          "target": 1390.0,
          "actual": 1568.0,
          "pct": 1.13
        },
        "quarterly_1": {
          "target": 1300.0,
          "actual": 1450.0,
          "pct": 1.1154
        },
        "quarterly_2": {
          "target": 1300.0
        },
        "weekly_1_1": {
          "target": 117.0,
          "actual": 125.0,
          "pct": 1.07
        },
        "weekly_1_2": {
          "target": 117.0,
          "actual": 126.0,
          "pct": 1.08
        },
        "weekly_1_4": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 450.0
        },
        "weekly_1_6": {
          "target": 516.0,
          "actual": 1.1467,
          "pct": 112.5
        },
        "weekly_2_1": {
          "target": 130.0,
          "actual": 1.16,
          "pct": 112.5
        },
        "weekly_2_2": {
          "target": 126.0,
          "pct": 112.5
        },
        "weekly_2_3": {
          "target": 132.0,
          "actual": 1.17,
          "pct": 112.5
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 105.0,
          "actual": 105.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 105.0,
          "actual": 105.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 105.0,
          "actual": 105.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 105.0,
          "actual": 105.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 95.0,
          "actual": 98.0,
          "pct": 1.0316
        },
        "weekly_4_2": {
          "target": 95.0,
          "actual": 100.0,
          "pct": 1.0526
        },
        "weekly_4_3": {
          "target": 95.0,
          "actual": 104.0,
          "pct": 1.0947
        },
        "weekly_4_4": {
          "target": 95.0,
          "actual": 104.0,
          "pct": 1.0947
        },
        "weekly_4_5": {
          "target": 95.0
        },
        "weekly_5_1": {
          "target": 80.0,
          "actual": 108.0,
          "pct": 1.35
        },
        "weekly_5_2": {
          "target": 80.0,
          "actual": 111.0,
          "pct": 1.3875
        },
        "weekly_5_3": {
          "target": 80.0,
          "actual": 120.0,
          "pct": 1.5
        },
        "weekly_5_4": {
          "target": 80.0
        },
        "weekly_6_1": {
          "target": 104.0,
          "actual": 114.0,
          "pct": 1.0962
        },
        "weekly_6_2": {
          "target": 104.0,
          "actual": 119.0,
          "pct": 1.1442
        },
        "weekly_6_3": {
          "target": 104.0,
          "actual": 113.0,
          "pct": 1.0865
        },
        "weekly_6_4": {
          "target": 112.0,
          "actual": 113.0,
          "pct": 1.0089
        },
        "weekly_7_1": {
          "target": 105.0,
          "actual": 105.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 100.0,
          "actual": 105.0,
          "pct": 1.05
        },
        "weekly_7_3": {
          "target": 105.0,
          "actual": 116.0,
          "pct": 1.1048
        },
        "weekly_7_4": {
          "target": 113.0
        }
      }
    },
    "Số lượng video BIÊN TẬP hoàn thành": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video hoàn thành TOCA",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.14,
          "actual": 4.0
        },
        "monthly_3": {
          "target": 8.0,
          "actual": 14.0,
          "pct": 1.75
        },
        "monthly_4": {
          "target": 13.0,
          "actual": 17.0,
          "pct": 1.31
        },
        "monthly_5": {
          "target": 13.0,
          "actual": 17.0,
          "pct": 1.3077
        },
        "monthly_6": {
          "target": 16.0,
          "actual": 20.0,
          "pct": 1.25
        },
        "monthly_7": {
          "target": 14.0
        },
        "yearly_2026": {
          "target": 45.0,
          "actual": 45.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 42.0,
          "actual": 50.0,
          "pct": 1.1905
        },
        "quarterly_2": {
          "target": 45.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.14
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_1_4": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 14.0,
          "actual": 1.1667,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 1.33,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 5.0,
          "pct": 3.0
        },
        "weekly_2_3": {
          "target": 4.0,
          "actual": 1.33,
          "pct": 3.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 2.0,
          "actual": 4.0,
          "pct": 2.0
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "weekly_3_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.3333
        },
        "weekly_4_3": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.3333
        },
        "weekly_4_4": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.3333
        },
        "weekly_4_5": {
          "target": 3.0
        },
        "weekly_5_1": {
          "target": 3.25,
          "actual": 4.0,
          "pct": 1.2308
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_5_4": {
          "target": 4.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 3.5,
          "actual": 4.0,
          "pct": 1.14
        },
        "weekly_7_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0
        }
      }
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 0.25
        },
        "monthly_5": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "monthly_6": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 3.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 8.0,
          "pct": 1.6
        },
        "quarterly_1": {
          "target": 15.0,
          "actual": 4.0,
          "pct": 0.2667
        },
        "quarterly_2": {
          "target": 10.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 5.0
        }
      }
    },
    "Số lượng video hoàn thành Doll AI": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng X views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 20.0,
          "actual": 25.0,
          "pct": 1.25
        },
        "monthly_5": {
          "target": 25.0,
          "actual": 21.0,
          "pct": 0.84
        },
        "monthly_6": {
          "target": 25.0,
          "actual": 31.0,
          "pct": 1.24
        },
        "monthly_7": {
          "target": 30.0
        },
        "yearly_2026": {
          "target": 35.0,
          "actual": 60.0,
          "pct": 1.71
        },
        "quarterly_1": {
          "target": 100.0,
          "actual": 80.0,
          "pct": 0.8
        },
        "quarterly_2": {
          "target": 100.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 30.0,
          "actual": 2.5
        }
      }
    },
    "TM3-I01.03": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video upload",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 30.0,
          "actual": 30.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 20.0,
          "actual": 30.0,
          "pct": 1.5
        },
        "monthly_6": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 16.0
        },
        "yearly_2026": {
          "target": 1542.0,
          "actual": 1568.0,
          "pct": 1.02
        },
        "quarterly_1": {
          "target": 60.0,
          "actual": 65.0,
          "pct": 1.0833
        },
        "quarterly_2": {
          "target": 60.0
        },
        "weekly_1_5": {
          "pct": 30.0
        },
        "weekly_1_6": {
          "target": 30.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 7.0
        },
        "weekly_5_1": {
          "target": 5.0,
          "actual": 5.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_6_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 5.0
        },
        "weekly_7_1": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_7_4": {
          "target": 4.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 241770846.0
        },
        "quarterly_1": {
          "target": 1.043,
          "actual": 252163726.0
        }
      }
    },
    "SL video đạt ngưỡng đột biến Y views (youtube)": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic BP WF",
      "formula": "Mức độ ứng dụng AI trong sản xuất",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_2": {
          "target": 0.76,
          "actual": 9600000.0,
          "pct": 7897562.0
        },
        "monthly_3": {
          "target": 55209500.0,
          "actual": 64859036.0,
          "pct": 1.1748
        },
        "monthly_4": {
          "target": 49000000.0,
          "actual": 43089715.0,
          "pct": 0.8794
        },
        "monthly_5": {
          "target": 54000000.0,
          "actual": 33647698.0,
          "pct": 0.6231
        },
        "monthly_6": {
          "target": 50000000.0,
          "actual": 48593741.0,
          "pct": 0.9719
        },
        "monthly_7": {
          "target": 53500000.0,
          "pct": 13734536.0
        },
        "yearly_2026": {
          "target": 109279500.0,
          "actual": 136163726.0,
          "pct": 1.25
        },
        "quarterly_1": {
          "target": 132491346.0,
          "actual": 116000000.0,
          "pct": 0.88
        },
        "quarterly_2": {
          "target": 160000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 9600000.0,
          "actual": 8007260.0,
          "pct": 0.83
        },
        "weekly_1_2": {
          "target": 9600000.0,
          "actual": 6461451.0,
          "pct": 0.67
        },
        "weekly_1_4": {
          "target": 0.82
        },
        "weekly_1_5": {
          "pct": 39865000.0
        },
        "weekly_1_6": {
          "target": 45480099.0,
          "actual": 1.14,
          "pct": 9966250.0
        },
        "weekly_2_1": {
          "target": 8506899.0,
          "actual": 0.8536,
          "pct": 9966250.0
        },
        "weekly_2_2": {
          "target": 13467750.0,
          "actual": 1.3513,
          "pct": 9966250.0
        },
        "weekly_2_3": {
          "target": 12609988.0,
          "actual": 1.27,
          "pct": 9966250.0
        },
        "weekly_2_4": {
          "target": 12993294.0,
          "actual": 1.3
        },
        "weekly_3_1": {
          "target": 13802375.0,
          "actual": 20793392.0,
          "pct": 1.5065
        },
        "weekly_3_2": {
          "target": 13802375.0,
          "actual": 21335715.0,
          "pct": 1.5458
        },
        "weekly_3_3": {
          "target": 13802375.0,
          "actual": 13983505.0,
          "pct": 1.0131
        },
        "weekly_3_4": {
          "target": 13802375.0,
          "actual": 7299862.0,
          "pct": 0.5289
        },
        "weekly_4_1": {
          "target": 12250000.0,
          "actual": 8742015.0,
          "pct": 0.7136
        },
        "weekly_4_2": {
          "target": 12250000.0,
          "actual": 12391949.0,
          "pct": 1.0116
        },
        "weekly_4_3": {
          "target": 12250000.0,
          "actual": 11068333.0,
          "pct": 0.9035
        },
        "weekly_4_4": {
          "target": 12250000.0,
          "actual": 11590232.0,
          "pct": 0.9461
        },
        "weekly_4_5": {
          "target": 12250000.0
        },
        "weekly_5_1": {
          "target": 13500000.0,
          "actual": 9720884.0,
          "pct": 0.7201
        },
        "weekly_5_2": {
          "target": 13500000.0,
          "actual": 11068333.0,
          "pct": 0.8199
        },
        "weekly_5_3": {
          "target": 13500000.0,
          "actual": 8218015.0,
          "pct": 0.6087
        },
        "weekly_5_4": {
          "target": 13500000.0
        },
        "weekly_6_1": {
          "target": 12500000.0,
          "actual": 11022169.0,
          "pct": 0.8818
        },
        "weekly_6_2": {
          "target": 12500000.0,
          "actual": 12878770.0,
          "pct": 1.0303
        },
        "weekly_6_3": {
          "target": 12500000.0,
          "actual": 15106608.0,
          "pct": 1.21
        },
        "weekly_6_4": {
          "target": 12500000.0,
          "actual": 13734536.0,
          "pct": 1.0988
        },
        "weekly_7_1": {
          "target": 14250000.0,
          "actual": 11426470.0,
          "pct": 0.8
        },
        "weekly_7_2": {
          "target": 14250000.0,
          "actual": 13952408.0,
          "pct": 0.9791
        },
        "weekly_7_3": {
          "target": 14250000.0,
          "actual": 13367418.0,
          "pct": 0.9381
        },
        "weekly_7_4": {
          "target": 14250000.0
        }
      }
    },
    "41.800.000": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_2": {
          "target": 0.58,
          "actual": 12500000.0,
          "pct": 10393357.0
        },
        "monthly_3": {
          "target": 50000000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 250000000.0,
          "actual": 94829212.0,
          "pct": 0.38
        },
        "quarterly_2": {
          "actual": 0.6666666667
        },
        "weekly_1_1": {
          "target": 12500000.0,
          "actual": 7794602.0,
          "pct": 0.62
        },
        "weekly_1_2": {
          "target": 12500000.0,
          "actual": 8598447.0,
          "pct": 0.69
        },
        "weekly_1_4": {
          "target": 0.83
        },
        "weekly_1_5": {
          "pct": 50000000.0
        },
        "weekly_1_6": {
          "target": 39755655.0,
          "actual": 0.8,
          "pct": 12500000.0
        },
        "weekly_2_1": {
          "target": 7629345.0,
          "actual": 0.6103,
          "pct": 12500000.0
        },
        "weekly_2_2": {
          "target": 8849034.0,
          "actual": 0.7079,
          "pct": 12500000.0
        },
        "weekly_2_3": {
          "target": 6971562.0,
          "actual": 0.56,
          "pct": 12500000.0
        },
        "weekly_2_4": {
          "target": 14130169.0,
          "actual": 1.13
        },
        "weekly_3_1": {
          "target": 12500000.0,
          "actual": 14296000.0,
          "pct": 1.1437
        },
        "weekly_3_2": {
          "target": 12500000.0,
          "actual": 10283498.0,
          "pct": 0.8227
        },
        "weekly_3_3": {
          "target": 12500000.0,
          "actual": 11242988.0,
          "pct": 0.8994
        },
        "weekly_3_4": {
          "target": 12500000.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "View shorts": {
      "title": "Số lượt view youtube SCVN",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_2": {
          "target": 1.05,
          "actual": 100000.0,
          "pct": 110000.0
        },
        "monthly_3": {
          "target": 400000.0,
          "actual": 330000.0,
          "pct": 0.825
        },
        "monthly_4": {
          "target": 500000.0,
          "actual": 287900.0,
          "pct": 0.5758
        },
        "monthly_5": {
          "target": 500000.0,
          "actual": 286350.0,
          "pct": 0.5727
        },
        "monthly_6": {
          "target": 500000.0,
          "actual": 234917.0,
          "pct": 0.4698
        },
        "monthly_7": {
          "target": 500.0
        },
        "yearly_2026": {
          "target": 1575000.0,
          "actual": 1065000.0,
          "pct": 0.68
        },
        "quarterly_1": {
          "target": 1200000.0,
          "actual": 800000.0,
          "pct": 0.6667
        },
        "quarterly_2": {
          "target": 2000000.0
        },
        "weekly_1_1": {
          "target": 100000.0,
          "actual": 105000.0,
          "pct": 1.05
        },
        "weekly_1_2": {
          "target": 100000.0,
          "actual": 107000.0,
          "pct": 1.07
        },
        "weekly_1_4": {
          "target": 1.1
        },
        "weekly_1_5": {
          "pct": 400000.0
        },
        "weekly_1_6": {
          "target": 392000.0,
          "actual": 0.98,
          "pct": 100000.0
        },
        "weekly_2_1": {
          "target": 115000.0,
          "actual": 1.15,
          "pct": 100000.0
        },
        "weekly_2_2": {
          "target": 100000.0,
          "actual": 1.0,
          "pct": 100000.0
        },
        "weekly_2_3": {
          "target": 95000.0,
          "actual": 0.95,
          "pct": 100000.0
        },
        "weekly_2_4": {
          "target": 92000.0,
          "actual": 0.92
        },
        "weekly_3_1": {
          "target": 100000.0,
          "actual": 95000.0,
          "pct": 0.95
        },
        "weekly_3_2": {
          "target": 100000.0,
          "actual": 90000.0,
          "pct": 0.9
        },
        "weekly_3_3": {
          "target": 100000.0,
          "actual": 70000.0,
          "pct": 0.7
        },
        "weekly_3_4": {
          "target": 100000.0,
          "actual": 68033.0,
          "pct": 0.6803
        },
        "weekly_4_1": {
          "target": 125000.0,
          "actual": 74655.0,
          "pct": 0.5972
        },
        "weekly_4_2": {
          "target": 125000.0,
          "actual": 71449.0,
          "pct": 0.5716
        },
        "weekly_4_3": {
          "target": 125000.0,
          "actual": 63648.0,
          "pct": 0.5092
        },
        "weekly_4_4": {
          "target": 125000.0,
          "actual": 64149.0,
          "pct": 0.5132
        },
        "weekly_4_5": {
          "target": 125000.0
        },
        "weekly_5_1": {
          "target": 125000.0,
          "actual": 105299.0,
          "pct": 0.8424
        },
        "weekly_5_2": {
          "target": 125000.0,
          "actual": 57263.0,
          "pct": 0.4581
        },
        "weekly_5_3": {
          "target": 125000.0,
          "actual": 43271.0,
          "pct": 0.3462
        },
        "weekly_5_4": {
          "target": 125000.0
        },
        "weekly_6_1": {
          "target": 125000.0,
          "actual": 218112.0,
          "pct": 0.0174
        },
        "weekly_6_2": {
          "target": 125000.0,
          "actual": 60000.0,
          "pct": 0.48
        },
        "weekly_6_3": {
          "target": 125000.0,
          "actual": 49685.0,
          "pct": 0.05
        },
        "weekly_6_4": {
          "target": 125000.0,
          "actual": 61640.0,
          "pct": 0.0616
        },
        "weekly_7_1": {
          "target": 500000.0,
          "actual": 235712.0,
          "pct": 0.47
        },
        "weekly_7_2": {
          "target": 500000.0
        },
        "weekly_7_3": {
          "target": 500000.0,
          "actual": 106650.0,
          "pct": 0.2133
        },
        "weekly_7_4": {
          "target": 500000.0
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        }
      }
    },
    "View Spotify": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt ngưỡng 5k$/ tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 7.0
        },
        "yearly_2026": {
          "target": 10.0,
          "actual": 5.0,
          "pct": 0.5
        },
        "quarterly_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "quarterly_2": {
          "target": 10.0
        },
        "weekly_1_5": {
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 6.0
        }
      }
    },
    "Số kênh đạt ngưỡng 1$/ tháng": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.9
        },
        "quarterly_1": {
          "target": 0.9
        },
        "quarterly_2": {
          "target": 0.9
        },
        "weekly_1_5": {
          "pct": 0.9
        },
        "weekly_1_6": {
          "target": 0.9
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 2.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 5.0,
          "pct": 2.5
        },
        "quarterly_1": {
          "target": 4.0,
          "actual": 4.0
        },
        "quarterly_2": {
          "target": 5.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "Số kênh đạt nút Bạc mới": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 2.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 10.0,
          "pct": 2.0
        },
        "quarterly_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "quarterly_2": {
          "target": 5.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 4.0
        }
      }
    },
    "Số kênh mở mới YT": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Số kênh mở mới FB": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Số kênh kinh doanh mở mới trong kỳ": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh trả lại",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "Số kênh mở mới Tiktok",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 3.5,
          "actual": 2.0,
          "pct": 0.5714
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0
        }
      }
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 13.0,
          "actual": 15.0,
          "pct": 1.1538
        },
        "quarterly_1": {
          "target": 15.0
        }
      }
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 41958250.0
        },
        "monthly_4": {
          "target": 43237809.0,
          "actual": 15356833.0,
          "pct": 0.3552
        },
        "monthly_5": {
          "target": 44531912.0,
          "actual": 13801360.0,
          "pct": 0.3099
        },
        "monthly_6": {
          "target": 46518297.0,
          "actual": 18692248.0,
          "pct": 0.4018
        },
        "monthly_7": {
          "target": 27500000.0
        },
        "yearly_2026": {
          "target": 160413372.0,
          "actual": 70128495.0,
          "pct": 0.4372
        },
        "quarterly_1": {
          "target": 179055224.0,
          "actual": 62234788.93,
          "pct": 0.3476
        },
        "quarterly_2": {
          "target": 92500000.0
        },
        "weekly_1_5": {
          "pct": 40263495.0
        },
        "weekly_1_6": {
          "target": 18365769.0,
          "actual": 0.4561
        }
      }
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 76287727.0
        },
        "monthly_4": {
          "target": 78614197.0,
          "actual": 27921515.0,
          "pct": 0.3552
        },
        "monthly_5": {
          "target": 80967112.0,
          "actual": 25093381.0,
          "pct": 0.3099
        },
        "monthly_6": {
          "target": 84578722.0,
          "actual": 33985906.0,
          "pct": 0.4018
        },
        "monthly_7": {
          "target": 78571429.0
        },
        "yearly_2026": {
          "target": 343742940.0,
          "actual": 95629765.82,
          "pct": 0.2782
        },
        "quarterly_1": {
          "target": 244166214.5,
          "actual": 93352183.4,
          "pct": 0.3823
        },
        "quarterly_2": {
          "target": 205555555.6
        },
        "weekly_1_5": {
          "pct": 73206354.0
        },
        "weekly_1_6": {
          "target": 33392308.0,
          "actual": 0.4561
        }
      }
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Thời gian sản xuất TB 1 video( Ngày)": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "CP SX Sản phẩm A": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số lượng đầu mục công việc/ quy trình được số hóa": {
      "title": "ROI",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 2.0
        },
        "quarterly_2": {
          "target": 2.0
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.1111
        },
        "quarterly_1": {
          "target": 0.9
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0
        },
        "quarterly_1": {
          "target": 1.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.3,
          "actual": 0.3,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.2
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "CP SX Sản phẩm B": {
      "title": "",
      "unit": "Nhân sự tuyển dụng mới",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.5
        },
        "quarterly_1": {
          "target": 0.3
        },
        "quarterly_2": {
          "target": 0.5
        }
      }
    },
    "TM7-I02": {
      "title": "ROI",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số nhân sự tăng": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.3
        },
        "quarterly_1": {
          "target": 0.3
        },
        "quarterly_2": {
          "target": 0.3
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.95
        },
        "monthly_4": {
          "target": 0.95,
          "actual": 0.94,
          "pct": 0.99
        },
        "monthly_5": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.95,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 0.85
        },
        "quarterly_1": {
          "target": 0.85
        },
        "quarterly_2": {
          "target": 0.85
        },
        "weekly_1_5": {
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_4": {
          "target": 5.0,
          "actual": 10.0
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 0.2
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 7.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 3.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 6.0,
          "actual": 15.0
        },
        "quarterly_1": {
          "target": 10.0
        },
        "quarterly_2": {
          "target": 10.0
        },
        "weekly_1_6": {
          "target": 5.0
        }
      }
    }
  },
  "DA01": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "DM1-I01.01",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "DM1-I01.01",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.15,
          "pct": 97044321.0
        },
        "monthly_3": {
          "target": 323254250.0,
          "actual": 363562011.0,
          "pct": 1.12
        },
        "monthly_4": {
          "target": 498323375.0,
          "actual": 351055557.0,
          "pct": 0.7
        },
        "monthly_5": {
          "target": 521453100.0,
          "actual": 363273491.0,
          "pct": 0.7
        },
        "monthly_6": {
          "actual": 537752012.0,
          "pct": 0.88,
          "target": 611851020.0
        },
        "monthly_7": {
          "target": 651900000.0,
          "pct": 0.65
        },
        "yearly_2026": {
          "target": 976888913.0,
          "actual": 949000000.0,
          "pct": 0.97
        },
        "quarterly_1": {
          "actual": 1422724199.0,
          "pct": 0.71
        },
        "weekly_1_1": {
          "pct": 0.91
        },
        "weekly_1_2": {
          "pct": 0.0
        },
        "weekly_1_4": {
          "target": 1.36
        },
        "weekly_1_5": {
          "pct": 329265250.0
        },
        "weekly_1_6": {
          "target": 318521374.0,
          "actual": 0.97,
          "pct": 109437500.0
        },
        "weekly_2_1": {
          "target": 90273063.0,
          "actual": 0.82,
          "pct": 109437500.0
        },
        "weekly_2_2": {
          "target": 98872533.0,
          "actual": 0.9,
          "pct": 109437500.0
        },
        "weekly_2_3": {
          "target": 94430400.0,
          "actual": 0.86,
          "pct": 109437500.0
        },
        "weekly_2_4": {
          "target": 108811003.0,
          "actual": 0.99
        },
        "weekly_3_1": {
          "target": 80813563.0,
          "actual": 76469879.0,
          "pct": 0.95
        },
        "weekly_3_2": {
          "target": 80813563.0,
          "actual": 73976702.0,
          "pct": 0.92
        },
        "weekly_3_3": {
          "target": 80813563.0,
          "actual": 70624889.0,
          "pct": 0.87
        },
        "weekly_3_4": {
          "target": 80813563.0,
          "actual": 79324616.0,
          "pct": 0.98
        },
        "weekly_4_1": {
          "target": 110738528.0,
          "actual": 84522501.0,
          "pct": 0.76
        },
        "weekly_4_2": {
          "target": 110738528.0,
          "actual": 67366725.0,
          "pct": 0.61
        },
        "weekly_4_3": {
          "target": 158586500.0,
          "actual": 84221436.0,
          "pct": 0.53
        },
        "weekly_4_4": {
          "target": 171022500.0,
          "actual": 85767985.0,
          "pct": 0.5
        },
        "weekly_4_5": {
          "target": 171022500.0,
          "actual": 110366457.0,
          "pct": 0.65
        },
        "weekly_5_1": {
          "target": 167283200.0,
          "actual": 130860411.0,
          "pct": 0.78
        },
        "weekly_5_2": {
          "target": 167283200.0,
          "actual": 129716147.0,
          "pct": 0.78
        },
        "weekly_5_3": {
          "target": 167283200.0,
          "actual": 114812429.0,
          "pct": 0.69
        },
        "weekly_5_4": {
          "target": 167283200.0,
          "actual": 120270502.0,
          "pct": 0.72
        },
        "weekly_6_1": {
          "target": 204336500.0,
          "actual": 71568026.0,
          "pct": 0.35
        },
        "weekly_6_2": {
          "target": 204336500.0,
          "actual": 72995231.0,
          "pct": 0.36
        },
        "weekly_6_3": {
          "target": 204336500.0,
          "actual": 152585428.0,
          "pct": 0.75
        },
        "weekly_6_4": {
          "target": 204336500.0,
          "actual": 124846942.0,
          "pct": 0.61
        },
        "weekly_7_1": {
          "target": 130380000.0,
          "actual": 110592732.0,
          "pct": 0.85
        },
        "weekly_7_2": {
          "target": 130380000.0,
          "actual": 158605237.0,
          "pct": 1.22
        },
        "weekly_7_3": {
          "target": 130380000.0,
          "actual": 155407347.0,
          "pct": 1.19
        },
        "weekly_7_4": {
          "target": 130380000.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "0 ₫": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "Dự án nhóm 1",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 915670000.0
        },
        "monthly_2": {
          "target": 0.99,
          "actual": 100000000.0,
          "pct": 112742896.0
        },
        "monthly_3": {
          "target": 500000000.0,
          "actual": 480604698.0,
          "pct": 0.96
        },
        "monthly_4": {
          "target": 500000000.0,
          "actual": 449449422.0,
          "pct": 0.9
        },
        "monthly_5": {
          "target": 500000000.0,
          "actual": 405206684.0,
          "pct": 0.81
        },
        "monthly_6": {
          "target": 500000000.0,
          "actual": 160000000.0,
          "pct": 0.32
        },
        "monthly_7": {
          "target": 288570000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 700000000.0,
          "actual": 1431986083.0,
          "pct": 2.0457
        },
        "quarterly_1": {
          "target": 1350000000.0,
          "actual": 1014656106.0,
          "pct": 0.75
        },
        "quarterly_2": {
          "target": 1015000000.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 100000000.0,
          "actual": 144588283.0,
          "pct": 1.45
        },
        "weekly_1_2": {
          "target": 100000000.0,
          "actual": 106522292.0,
          "pct": 1.07
        },
        "weekly_1_4": {
          "target": 1.13
        },
        "weekly_1_5": {
          "pct": 535400000.0
        },
        "weekly_1_6": {
          "target": 418996772.0,
          "actual": 0.78,
          "pct": 100000000.0
        },
        "weekly_2_1": {
          "target": 110297823.0,
          "actual": 1.1,
          "pct": 100000000.0
        },
        "weekly_2_2": {
          "target": 107480668.0,
          "actual": 1.07,
          "pct": 100000000.0
        },
        "weekly_2_3": {
          "target": 88995453.0,
          "actual": 0.89,
          "pct": 100000000.0
        },
        "weekly_2_4": {
          "target": 111857174.0,
          "actual": 1.12
        },
        "weekly_3_1": {
          "target": 125000000.0,
          "actual": 116725818.0,
          "pct": 0.93
        },
        "weekly_3_2": {
          "target": 125000000.0,
          "actual": 103300740.0,
          "pct": 0.83
        },
        "weekly_3_3": {
          "target": 125000000.0,
          "actual": 102024381.0,
          "pct": 0.82
        },
        "weekly_3_4": {
          "target": 125000000.0,
          "actual": 104033973.0,
          "pct": 0.83
        },
        "weekly_4_1": {
          "target": 125000000.0,
          "actual": 123206728.0,
          "pct": 0.99
        },
        "weekly_4_2": {
          "target": 125000000.0,
          "actual": 101343428.0,
          "pct": 0.81
        },
        "weekly_4_3": {
          "target": 125000000.0,
          "actual": 109223232.0,
          "pct": 0.87
        },
        "weekly_4_4": {
          "target": 125000000.0,
          "actual": 97652994.0,
          "pct": 0.78
        },
        "weekly_4_5": {
          "target": 125000000.0,
          "actual": 108182114.0,
          "pct": 0.87
        },
        "weekly_5_1": {
          "target": 125000000.0,
          "actual": 112166594.0,
          "pct": 0.9
        },
        "weekly_5_2": {
          "target": 125000000.0,
          "actual": 93646914.0,
          "pct": 0.75
        },
        "weekly_5_3": {
          "target": 125000000.0,
          "actual": 60861425.0,
          "pct": 0.49
        },
        "weekly_5_4": {
          "target": 125000000.0,
          "actual": 86505523.0,
          "pct": 0.69
        },
        "weekly_6_1": {
          "target": 125000000.0,
          "actual": 52245978.0,
          "pct": 0.42
        },
        "weekly_6_2": {
          "target": 125000000.0,
          "actual": 8443575.0,
          "pct": 0.07
        },
        "weekly_6_3": {
          "target": 125000000.0,
          "actual": 25257706.0,
          "pct": 0.2
        },
        "weekly_6_4": {
          "target": 125000000.0,
          "actual": 26297536.0,
          "pct": 0.21
        },
        "weekly_7_1": {
          "target": 57714000.0,
          "actual": 80336227.0,
          "pct": 1.39
        },
        "weekly_7_2": {
          "target": 57714000.0,
          "actual": 92650912.0,
          "pct": 1.61
        },
        "weekly_7_3": {
          "target": 57714000.0,
          "actual": 100660761.8,
          "pct": 1.74
        },
        "weekly_7_4": {
          "target": 57714000.0
        },
        "weekly_7_5": {
          "target": 67958800.0
        }
      }
    },
    "LanNP": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "Dự án nhóm 3",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 105249999.0
        },
        "monthly_2": {
          "target": 0.44,
          "actual": 4447813.0,
          "pct": 1720569.0
        },
        "monthly_3": {
          "target": 14003267.0,
          "actual": 13003267.0,
          "pct": 0.93
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 11286455.0,
          "pct": 1.2
        },
        "monthly_5": {
          "target": 13000000.0,
          "actual": 40845447.0,
          "pct": 3.14
        },
        "monthly_6": {
          "target": 42000000.0,
          "actual": 70873563.0,
          "pct": 1.69
        },
        "monthly_7": {
          "target": 71000000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 100316666.0,
          "actual": 31373530.0,
          "pct": 0.3127
        },
        "quarterly_1": {
          "target": 1200000.0,
          "actual": 123005465.0,
          "pct": 8.66
        },
        "quarterly_2": {
          "target": 120000000.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4447813.0,
          "actual": 2435610.0,
          "pct": 0.55
        },
        "weekly_1_2": {
          "target": 4447813.0,
          "actual": 2119921.0,
          "pct": 0.48
        },
        "weekly_1_4": {
          "target": 0.39
        },
        "weekly_1_5": {
          "pct": 10418818.0
        },
        "weekly_1_6": {
          "target": 8740664.0,
          "actual": 0.84,
          "pct": 2604705.0
        },
        "weekly_2_1": {
          "target": 1612505.0,
          "actual": 0.62,
          "pct": 2604705.0
        },
        "weekly_2_2": {
          "target": 2251887.0,
          "actual": 0.86,
          "pct": 2604705.0
        },
        "weekly_2_3": {
          "target": 2242877.0,
          "actual": 0.86,
          "pct": 2604705.0
        },
        "weekly_2_4": {
          "target": 2719406.0,
          "actual": 1.04
        },
        "weekly_3_1": {
          "target": 3500817.0,
          "actual": 3571577.0,
          "pct": 1.02
        },
        "weekly_3_2": {
          "target": 3500817.0,
          "actual": 2741555.0,
          "pct": 0.78
        },
        "weekly_3_3": {
          "target": 3500817.0,
          "actual": 2739918.0,
          "pct": 0.78
        },
        "weekly_3_4": {
          "target": 3500817.0,
          "actual": 7964775.0,
          "pct": 2.28
        },
        "weekly_4_1": {
          "target": 4000000.0,
          "actual": 4042039.0,
          "pct": 1.01
        },
        "weekly_4_2": {
          "target": 4200000.0,
          "actual": 3140485.0,
          "pct": 0.75
        },
        "weekly_4_3": {
          "target": 4200000.0,
          "actual": 2813779.0,
          "pct": 0.67
        },
        "weekly_4_4": {
          "target": 3000000.0,
          "actual": 2663332.0,
          "pct": 0.89
        },
        "weekly_4_5": {
          "target": 3000000.0,
          "actual": 2676055.0,
          "pct": 0.89
        },
        "weekly_5_1": {
          "target": 3250000.0,
          "actual": 3327449.0,
          "pct": 1.02
        },
        "weekly_5_2": {
          "target": 3250000.0,
          "actual": 12737978.0,
          "pct": 3.92
        },
        "weekly_5_3": {
          "target": 15000000.0,
          "actual": 13187476.0,
          "pct": 0.88
        },
        "weekly_5_4": {
          "target": 15000000.0,
          "actual": 10640074.0,
          "pct": 0.71
        },
        "weekly_6_1": {
          "target": 10500000.0,
          "actual": 18548453.0,
          "pct": 1.77
        },
        "weekly_6_2": {
          "target": 19000000.0,
          "actual": 16625974.0,
          "pct": 0.88
        },
        "weekly_6_3": {
          "target": 19000000.0,
          "actual": 16035032.0,
          "pct": 0.84
        },
        "weekly_6_4": {
          "target": 19000000.0,
          "actual": 16432859.0,
          "pct": 0.86
        },
        "weekly_7_1": {
          "target": 14200000.0,
          "actual": 8514712.0,
          "pct": 0.6
        },
        "weekly_7_2": {
          "target": 14200000.0,
          "actual": 19113395.0,
          "pct": 1.35
        },
        "weekly_7_3": {
          "target": 19000000.0,
          "actual": 29996669.0,
          "pct": 1.58
        },
        "weekly_7_4": {
          "target": 30000000.0
        },
        "weekly_7_5": {
          "target": 27183520.0
        }
      }
    },
    "LinhDT": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "Dự án nhóm 2",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 317868300.0
        },
        "monthly_2": {
          "target": 0.81,
          "actual": 19621500.0,
          "pct": 21803455.0
        },
        "monthly_3": {
          "target": 116325000.0,
          "actual": 90969252.0,
          "pct": 0.78
        },
        "monthly_4": {
          "target": 190256000.0,
          "actual": 106804380.0,
          "pct": 0.56
        },
        "monthly_5": {
          "target": 219559200.0,
          "actual": 337017792.0,
          "pct": 1.53
        },
        "monthly_6": {
          "target": 340000000.0,
          "actual": 355476800.0,
          "pct": 1.05
        },
        "monthly_7": {
          "target": 392070000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 272061000.0,
          "actual": 240124524.0,
          "pct": 0.88
        },
        "quarterly_1": {
          "target": 668222500.0,
          "actual": 799298972.0,
          "pct": 1.2
        },
        "quarterly_2": {
          "target": 1176210000.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 19621500.0,
          "actual": 13452841.0,
          "pct": 0.69
        },
        "weekly_1_2": {
          "target": 19621500.0,
          "actual": 14441311.0,
          "pct": 0.74
        },
        "weekly_1_4": {
          "target": 1.11
        },
        "weekly_1_5": {
          "pct": 77250000.0
        },
        "weekly_1_6": {
          "target": 76928898.0,
          "actual": 1.0,
          "pct": 19312500.0
        },
        "weekly_2_1": {
          "target": 20492365.0,
          "actual": 1.06,
          "pct": 19312500.0
        },
        "weekly_2_2": {
          "target": 19250185.0,
          "actual": 1.0,
          "pct": 19312500.0
        },
        "weekly_2_3": {
          "target": 20113840.0,
          "actual": 1.04,
          "pct": 19312500.0
        },
        "weekly_2_4": {
          "target": 20398120.0,
          "actual": 1.06
        },
        "weekly_3_1": {
          "target": 29081250.0,
          "actual": 17398084.0,
          "pct": 0.6
        },
        "weekly_3_2": {
          "target": 29081250.0,
          "actual": 17316398.0,
          "pct": 0.6
        },
        "weekly_3_3": {
          "target": 29081250.0,
          "actual": 17823834.0,
          "pct": 0.61
        },
        "weekly_3_4": {
          "target": 29081250.0,
          "actual": 24881142.0,
          "pct": 0.86
        },
        "weekly_4_1": {
          "target": 38051200.0,
          "actual": 10906915.0,
          "pct": 0.29
        },
        "weekly_4_2": {
          "target": 47564000.0,
          "actual": 10216035.0,
          "pct": 0.21
        },
        "weekly_4_3": {
          "target": 47564000.0,
          "actual": 18884059.0,
          "pct": 0.4
        },
        "weekly_4_4": {
          "target": 60000000.0,
          "actual": 37945347.0,
          "pct": 0.63
        },
        "weekly_4_5": {
          "target": 60000000.0,
          "actual": 40067392.0,
          "pct": 0.67
        },
        "weekly_5_1": {
          "target": 54889800.0,
          "actual": 85686637.0,
          "pct": 1.56
        },
        "weekly_5_2": {
          "target": 54889800.0,
          "actual": 87665022.0,
          "pct": 1.6
        },
        "weekly_5_3": {
          "target": 54889800.0,
          "actual": 67788642.0,
          "pct": 1.23
        },
        "weekly_5_4": {
          "target": 54889800.0,
          "actual": 77290589.0,
          "pct": 1.41
        },
        "weekly_6_1": {
          "target": 85000000.0,
          "actual": 35945323.0,
          "pct": 0.42
        },
        "weekly_6_2": {
          "target": 85000000.0,
          "actual": 71120801.0,
          "pct": 0.84
        },
        "weekly_6_3": {
          "target": 85000000.0,
          "actual": 139676476.0,
          "pct": 1.64
        },
        "weekly_6_4": {
          "target": 85000000.0,
          "actual": 88042657.0,
          "pct": 1.04
        },
        "weekly_7_1": {
          "target": 78414000.0,
          "actual": 63496861.0,
          "pct": 0.81
        },
        "weekly_7_2": {
          "target": 78414000.0,
          "actual": 108785833.0,
          "pct": 1.39
        },
        "weekly_7_3": {
          "target": 78414000.0,
          "actual": 100975015.0,
          "pct": 1.29
        },
        "weekly_7_4": {
          "target": 78414000.0
        },
        "weekly_7_5": {
          "target": 78414000.0
        }
      }
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.95
        },
        "monthly_3": {
          "target": 0.95,
          "actual": 0.95,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        },
        "quarterly_2": {
          "target": 0.0,
          "pct": 1.4992
        },
        "weekly_1_1": {
          "target": 0.95,
          "actual": 1220132.0
        },
        "weekly_1_5": {
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "DM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.95
        },
        "monthly_3": {
          "target": 0.95,
          "actual": 0.95,
          "pct": 1.0
        },
        "monthly_4": {
          "pct": 1631627495.0
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        },
        "quarterly_2": {
          "target": 0.0,
          "actual": 0.268
        },
        "weekly_1_5": {
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 0.95
        },
        "weekly_3_1": {
          "target": 0.95,
          "pct": 0.0
        }
      }
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí mua công cụ AI phân bổ hàng tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 564.0,
          "actual": 0.0
        },
        "monthly_2": {
          "target": 0.62,
          "actual": 134.0,
          "pct": 174.0
        },
        "monthly_3": {
          "target": 239.0,
          "actual": 486.0,
          "pct": 2.03
        },
        "monthly_4": {
          "target": 463.0,
          "actual": 488.0,
          "pct": 1.05
        },
        "monthly_5": {
          "target": 157.0,
          "actual": 153.0,
          "pct": 0.97
        },
        "monthly_6": {
          "target": 92.0,
          "actual": 91.0,
          "pct": 0.99
        },
        "monthly_7": {
          "target": 92.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1349.0,
          "actual": 1520.0,
          "pct": 1.13
        },
        "quarterly_1": {
          "target": 1230.0,
          "actual": 732.0,
          "pct": 0.6
        },
        "quarterly_2": {
          "target": 225.0,
          "actual": 0.0
        },
        "weekly_1_1": {
          "target": 210.0,
          "actual": 361.0,
          "pct": 1.72
        },
        "weekly_1_2": {
          "target": 210.0,
          "actual": 268.0,
          "pct": 1.28
        },
        "weekly_1_4": {
          "target": 1.3
        },
        "weekly_1_5": {
          "pct": 59.0
        },
        "weekly_1_6": {
          "target": 59.0,
          "actual": 1.0,
          "pct": 11.0
        },
        "weekly_2_1": {
          "target": 11.0,
          "actual": 1.0,
          "pct": 26.0
        },
        "weekly_2_2": {
          "target": 27.0,
          "actual": 1.04,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 19.0
        },
        "weekly_2_4": {
          "target": 14.0,
          "actual": 0.74
        },
        "weekly_3_1": {
          "target": 62.0,
          "actual": 90.0,
          "pct": 1.45
        },
        "weekly_3_2": {
          "target": 100.0,
          "actual": 97.0,
          "pct": 0.97
        },
        "weekly_3_3": {
          "target": 93.0,
          "actual": 162.0,
          "pct": 1.74
        },
        "weekly_3_4": {
          "target": 95.0,
          "actual": 121.0
        },
        "weekly_4_1": {
          "target": 114.0,
          "actual": 204.0,
          "pct": 1.79
        },
        "weekly_4_2": {
          "target": 160.0,
          "actual": 323.0,
          "pct": 2.02
        },
        "weekly_4_3": {
          "target": 49.0,
          "actual": 52.0,
          "pct": 1.06
        },
        "weekly_4_4": {
          "target": 49.0,
          "actual": 41.0,
          "pct": 0.84
        },
        "weekly_4_5": {
          "target": 26.0,
          "actual": 25.0,
          "pct": 0.96
        },
        "weekly_5_1": {
          "target": 34.0,
          "actual": 33.0,
          "pct": 0.97
        },
        "weekly_5_2": {
          "target": 37.0,
          "actual": 36.0,
          "pct": 0.97
        },
        "weekly_5_3": {
          "target": 36.0,
          "actual": 35.0,
          "pct": 0.97
        },
        "weekly_5_4": {
          "target": 37.0,
          "actual": 40.0,
          "pct": 1.08
        },
        "weekly_6_1": {
          "target": 23.0,
          "actual": 18.0,
          "pct": 0.8
        },
        "weekly_6_2": {
          "target": 26.0,
          "actual": 27.0,
          "pct": 1.04
        },
        "weekly_6_3": {
          "target": 26.0,
          "actual": 25.0,
          "pct": 0.96
        },
        "weekly_6_4": {
          "target": 24.0,
          "actual": 25.0,
          "pct": 1.04
        },
        "weekly_7_1": {
          "target": 17.0,
          "actual": 9.0,
          "pct": 0.53
        },
        "weekly_7_2": {
          "target": 22.0,
          "actual": 21.0,
          "pct": 0.94
        },
        "weekly_7_3": {
          "target": 19.0,
          "actual": 18.0,
          "pct": 0.93
        },
        "weekly_7_4": {
          "target": 19.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "DM1-I03.01": {
      "title": "",
      "unit": "VM2-I01.01",
      "formula": "Dự án nhóm 1",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.33
        },
        "weekly_1_2": {
          "target": 3.0,
          "actual": 4.0,
          "pct": 1.33
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_6": {
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0
        }
      }
    },
    "DM2-I01.01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "Dự án nhóm 1",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.6,
          "actual": 125.0,
          "pct": 163.0
        },
        "monthly_3": {
          "target": 22.0,
          "actual": 29.0,
          "pct": 1.3182
        },
        "monthly_4": {
          "target": 28.0,
          "actual": 43.0,
          "pct": 1.54
        },
        "monthly_5": {
          "target": 42.0,
          "actual": 49.0,
          "pct": 1.17
        },
        "monthly_6": {
          "target": 42.0,
          "actual": 50.0,
          "pct": 1.19
        },
        "monthly_7": {
          "target": 52.0
        },
        "yearly_2026": {
          "target": 840.0,
          "actual": 931.0,
          "pct": 1.11
        },
        "quarterly_1": {
          "target": 60.0,
          "actual": 142.0,
          "pct": 2.37
        },
        "quarterly_2": {
          "target": 120.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 200.0,
          "actual": 350.0,
          "pct": 1.75
        },
        "weekly_1_2": {
          "target": 200.0,
          "actual": 255.0,
          "pct": 1.28
        },
        "weekly_1_4": {
          "target": 1.3
        },
        "weekly_1_5": {
          "pct": 18.0
        },
        "weekly_1_6": {
          "target": 18.0,
          "actual": 1.0,
          "pct": 5.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 0.8,
          "pct": 9.0
        },
        "weekly_2_2": {
          "target": 9.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 5.0
        },
        "weekly_3_1": {
          "target": 6.0,
          "actual": 5.0,
          "pct": 0.83
        },
        "weekly_3_2": {
          "target": 6.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 5.0
        },
        "weekly_3_4": {
          "target": 5.0,
          "actual": 3.0
        },
        "weekly_4_1": {
          "target": 5.0,
          "actual": 6.0,
          "pct": 1.2
        },
        "weekly_4_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 5.0,
          "actual": 8.0,
          "pct": 1.6
        },
        "weekly_4_4": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 7.0,
          "actual": 8.0,
          "pct": 1.14
        },
        "weekly_5_2": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 9.0,
          "actual": 11.0,
          "pct": 1.22
        },
        "weekly_5_4": {
          "target": 9.0,
          "actual": 12.0,
          "pct": 1.33
        },
        "weekly_6_1": {
          "target": 10.0,
          "actual": 10.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 11.0,
          "actual": 14.0,
          "pct": 1.27
        },
        "weekly_6_3": {
          "target": 11.0,
          "actual": 13.0,
          "pct": 1.18
        },
        "weekly_6_4": {
          "target": 11.0,
          "actual": 15.0,
          "pct": 1.36
        },
        "weekly_7_1": {
          "target": 10.0,
          "actual": 5.0,
          "pct": 0.5
        },
        "weekly_7_2": {
          "target": 10.0,
          "actual": 11.0,
          "pct": 1.06
        },
        "weekly_7_3": {
          "target": 10.0,
          "actual": 12.0,
          "pct": 1.15
        },
        "weekly_7_4": {
          "target": 10.0
        }
      }
    },
    "Dự án 2 (sản phẩm AI)": {
      "title": "",
      "unit": "VM2-I01.01",
      "formula": "Dự án nhóm 3",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 72.0
        },
        "monthly_2": {
          "target": 0.67,
          "actual": 3.0,
          "pct": 3.0
        },
        "monthly_3": {
          "target": 22.0
        },
        "yearly_2026": {
          "target": 66.0
        },
        "quarterly_1": {
          "target": 72.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 23.0
        },
        "weekly_1_6": {
          "target": 23.0,
          "pct": 2.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 1.5,
          "pct": 13.0
        },
        "weekly_2_2": {
          "target": 13.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 7.0
        },
        "weekly_2_4": {
          "target": 7.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 7.0,
          "pct": 0.0
        }
      }
    },
    "DM2-I01.01.02": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "Dự án nhóm 3",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 185.0,
          "actual": 447.0,
          "pct": 1.2
        },
        "monthly_4": {
          "target": 280.0,
          "actual": 299.0,
          "pct": 1.07
        },
        "monthly_5": {
          "target": 20.0,
          "actual": 17.0,
          "pct": 0.85
        },
        "monthly_6": {
          "target": 20.0,
          "actual": 11.0,
          "pct": 0.55
        },
        "monthly_7": {
          "target": 20.0
        },
        "yearly_2026": {
          "target": 395.0,
          "actual": 539.0,
          "pct": 1.36
        },
        "quarterly_1": {
          "target": 666.0,
          "actual": 327.0,
          "pct": 0.49
        },
        "quarterly_2": {
          "target": 60.0,
          "pct": 0.0
        },
        "weekly_3_1": {
          "target": 46.0,
          "actual": 82.0,
          "pct": 1.78
        },
        "weekly_3_2": {
          "target": 90.0,
          "actual": 93.0,
          "pct": 1.03
        },
        "weekly_3_3": {
          "target": 90.0,
          "actual": 154.0,
          "pct": 1.71
        },
        "weekly_3_4": {
          "target": 90.0,
          "actual": 118.0,
          "pct": 1.31
        },
        "weekly_4_1": {
          "target": 70.0,
          "actual": 158.0,
          "pct": 2.26
        },
        "weekly_4_2": {
          "target": 120.0,
          "actual": 285.0,
          "pct": 2.38
        },
        "weekly_4_3": {
          "target": 7.0,
          "actual": 8.0,
          "pct": 1.14
        },
        "weekly_4_4": {
          "target": 8.0,
          "actual": 5.0,
          "pct": 0.63
        },
        "weekly_4_5": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 5.0,
          "actual": 3.0,
          "pct": 0.6
        },
        "weekly_5_2": {
          "target": 5.0,
          "actual": 4.0,
          "pct": 0.8
        },
        "weekly_5_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 0.2
        },
        "weekly_6_2": {
          "target": 6.0,
          "actual": 4.0,
          "pct": 0.67
        },
        "weekly_6_3": {
          "target": 6.0,
          "actual": 3.0,
          "pct": 0.5
        },
        "weekly_6_4": {
          "target": 6.0,
          "actual": 3.0,
          "pct": 0.5
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "weekly_7_2": {
          "target": 6.0,
          "actual": 4.0,
          "pct": 0.67
        },
        "weekly_7_3": {
          "target": 5.0,
          "actual": 2.0,
          "pct": 0.4
        },
        "weekly_7_4": {
          "target": 5.0
        }
      }
    },
    "Dự án 3 (nội dung 3D Kids Songs)": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "Dự án nhóm 2",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 492.0
        },
        "monthly_2": {
          "target": 1.5,
          "actual": 4.0,
          "pct": 6.0
        },
        "monthly_3": {
          "target": 10.0,
          "actual": 10.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 155.0,
          "actual": 146.0,
          "pct": 0.94
        },
        "monthly_5": {
          "target": 95.0,
          "actual": 87.0,
          "pct": 0.92
        },
        "monthly_6": {
          "target": 30.0,
          "actual": 30.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 20.0
        },
        "yearly_2026": {
          "target": 48.0,
          "actual": 50.0,
          "pct": 1.04
        },
        "quarterly_1": {
          "target": 432.0,
          "actual": 263.0,
          "pct": 0.61
        },
        "quarterly_2": {
          "target": 45.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 6.0,
          "pct": 1.5
        },
        "weekly_1_4": {
          "target": 1.5
        },
        "weekly_1_5": {
          "pct": 18.0
        },
        "weekly_1_6": {
          "target": 18.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 5.0,
          "actual": 1.25,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 7.0
        },
        "weekly_2_4": {
          "target": 7.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 38.75,
          "actual": 40.0,
          "pct": 1.03
        },
        "weekly_4_2": {
          "target": 35.0,
          "actual": 33.0,
          "pct": 0.94
        },
        "weekly_4_3": {
          "target": 37.0,
          "actual": 36.0,
          "pct": 0.97
        },
        "weekly_4_4": {
          "target": 36.0,
          "actual": 31.0,
          "pct": 0.86
        },
        "weekly_4_5": {
          "target": 21.0,
          "actual": 20.0,
          "pct": 0.95
        },
        "weekly_5_1": {
          "target": 22.0,
          "actual": 22.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 23.0,
          "actual": 23.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 22.0,
          "actual": 19.0,
          "pct": 0.86
        },
        "weekly_5_4": {
          "target": 23.0,
          "actual": 23.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 8.0,
          "actual": 7.0,
          "pct": 0.93
        },
        "weekly_6_2": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_7_1": {
          "target": 4.0,
          "actual": 3.0,
          "pct": 0.75
        },
        "weekly_7_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0
        },
        "weekly_7_5": {
          "target": 4.0
        }
      }
    },
    "Dự án 4 (sản phẩm AI Spotify)": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Video",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        }
      }
    },
    "Số lượng video đạt >=1 Triệu view trên nền tảng Youtube trong kỳ": {
      "title": "Số vi phạm chính sách",
      "unit": "Dự án 2",
      "formula": "Dự án nhóm 3",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 2.0
        },
        "yearly_2026": {
          "target": 2.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "monthly_3": {
          "target": 2.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Số lượng video đạt ngưỡng 1M views": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube DA01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 139000000.0
        },
        "monthly_2": {
          "target": 0.95,
          "actual": 107283975.0,
          "pct": 115441437.0
        },
        "monthly_3": {
          "target": 518292811.0,
          "actual": 497749698.0,
          "pct": 0.96
        },
        "monthly_4": {
          "target": 507000000.0,
          "actual": 460735877.0,
          "pct": 0.91
        },
        "monthly_5": {
          "target": 513000000.0,
          "actual": 446052131.0,
          "pct": 0.87
        },
        "monthly_6": {
          "target": 542000000.0,
          "actual": 230873563.0,
          "pct": 0.43
        },
        "monthly_7": {
          "target": 359570000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 833966666.0,
          "actual": 1479664437.0,
          "pct": 1.77
        },
        "quarterly_1": {
          "target": 1368398391.0,
          "actual": 1137661571.0,
          "pct": 0.83
        },
        "quarterly_2": {
          "target": 1135000000.0
        },
        "weekly_1_1": {
          "target": 107197813.0,
          "actual": 148796480.0,
          "pct": 1.39
        },
        "weekly_1_2": {
          "target": 107197813.0,
          "actual": 109787158.0,
          "pct": 1.02
        },
        "weekly_1_4": {
          "target": 1.08
        },
        "weekly_1_5": {
          "pct": 552855182.0
        },
        "weekly_1_6": {
          "target": 433726215.0,
          "actual": 0.78,
          "pct": 104509706.0
        },
        "weekly_2_1": {
          "target": 113265309.0,
          "actual": 1.08,
          "pct": 104509706.0
        },
        "weekly_2_2": {
          "target": 111180402.0,
          "actual": 1.06,
          "pct": 104509706.0
        },
        "weekly_2_3": {
          "target": 92960312.0,
          "actual": 0.89,
          "pct": 104509706.0
        },
        "weekly_2_4": {
          "target": 116473792.0,
          "actual": 1.11
        },
        "weekly_3_1": {
          "target": 129739812.0,
          "actual": 120936673.0,
          "pct": 0.93
        },
        "weekly_3_2": {
          "target": 129790812.0,
          "actual": 108068726.0,
          "pct": 0.83
        },
        "weekly_3_3": {
          "target": 130679445.0,
          "actual": 105870505.0,
          "pct": 0.81
        },
        "weekly_3_4": {
          "target": 129679445.0
        },
        "weekly_4_1": {
          "target": 129000000.0,
          "actual": 127248767.0,
          "pct": 0.99
        },
        "weekly_4_2": {
          "target": 129200000.0,
          "actual": 104483913.0,
          "pct": 0.81
        },
        "weekly_4_3": {
          "target": 129200000.0,
          "actual": 112037011.0,
          "pct": 0.87
        },
        "weekly_4_4": {
          "target": 128000000.0,
          "actual": 100316326.0,
          "pct": 0.78
        },
        "weekly_4_5": {
          "target": 128000000.0,
          "actual": 110858169.0,
          "pct": 0.87
        },
        "weekly_5_1": {
          "target": 128250000.0,
          "actual": 115494043.0,
          "pct": 0.9
        },
        "weekly_5_2": {
          "target": 128250000.0,
          "actual": 106384892.0,
          "pct": 0.83
        },
        "weekly_5_3": {
          "target": 140000000.0,
          "actual": 74048901.0,
          "pct": 0.53
        },
        "weekly_5_4": {
          "target": 140000000.0,
          "actual": 97145597.0,
          "pct": 0.69
        },
        "weekly_6_1": {
          "target": 135500000.0,
          "actual": 70794431.0,
          "pct": 0.52
        },
        "weekly_6_2": {
          "target": 144000000.0,
          "actual": 25069549.0,
          "pct": 0.1741
        },
        "weekly_6_3": {
          "target": 144000000.0,
          "actual": 41292738.0,
          "pct": 0.2868
        },
        "weekly_6_4": {
          "target": 144000000.0,
          "actual": 42730395.0,
          "pct": 0.2967
        },
        "weekly_7_1": {
          "target": 71914000.0,
          "actual": 88850939.0,
          "pct": 1.2355
        },
        "weekly_7_2": {
          "target": 71914000.0,
          "actual": 111764307.0,
          "pct": 1.5541
        },
        "weekly_7_3": {
          "target": 71914000.0,
          "actual": 130657431.0,
          "pct": 1.8169
        },
        "weekly_7_4": {
          "target": 71914000.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "DM3-I01.04": {
      "title": "Số lượt play Spotify",
      "unit": "Stream",
      "formula": "Dự án nhóm 2",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 750001.0
        },
        "monthly_2": {
          "target": 1.45,
          "actual": 86162.0,
          "pct": 151894.0
        },
        "monthly_3": {
          "target": 714511.0,
          "actual": 463405.5,
          "pct": 0.65
        },
        "monthly_4": {
          "target": 1888569.0,
          "actual": 1952509.0,
          "pct": 1.03
        },
        "monthly_5": {
          "target": 2300000.0,
          "actual": 3710882.0,
          "pct": 1.61
        },
        "monthly_6": {
          "target": 4000000.0,
          "actual": 2800000.0,
          "pct": 0.7
        },
        "monthly_7": {
          "target": 2400000.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 650000.0,
          "actual": 1413968.0,
          "pct": 2.1753
        },
        "quarterly_1": {
          "target": 3000000.0,
          "actual": 8463391.0,
          "pct": 2.82
        },
        "quarterly_2": {
          "target": 7500000.0
        },
        "weekly_1_1": {
          "target": 86162.0,
          "actual": 106579.0,
          "pct": 1.24
        },
        "weekly_1_2": {
          "target": 86162.0,
          "actual": 111057.0,
          "pct": 1.29
        },
        "weekly_1_4": {
          "target": 1.76
        },
        "weekly_1_5": {
          "pct": 583643.0
        },
        "weekly_1_6": {
          "target": 399303.0,
          "actual": 0.68,
          "pct": 145911.0
        },
        "weekly_2_1": {
          "target": 119288.0,
          "actual": 0.82,
          "pct": 145911.0
        },
        "weekly_2_2": {
          "target": 111295.0,
          "actual": 0.76,
          "pct": 145911.0
        },
        "weekly_2_3": {
          "target": 99721.0,
          "actual": 0.68,
          "pct": 145911.0
        },
        "weekly_2_4": {
          "target": 102939.0,
          "actual": 0.71
        },
        "weekly_3_1": {
          "target": 178628.0,
          "actual": 147354.0,
          "pct": 0.82
        },
        "weekly_3_2": {
          "target": 178628.0,
          "actual": 144689.0,
          "pct": 0.81
        },
        "weekly_3_3": {
          "target": 178628.0,
          "actual": 108440.0,
          "pct": 0.61
        },
        "weekly_3_4": {
          "target": 178628.0,
          "actual": 123101.0,
          "pct": 0.69
        },
        "weekly_4_1": {
          "target": 472142.0,
          "actual": 209991.0,
          "pct": 0.44
        },
        "weekly_4_2": {
          "target": 472142.0,
          "actual": 264197.0,
          "pct": 0.56
        },
        "weekly_4_3": {
          "target": 583517.0,
          "actual": 589904.0,
          "pct": 1.01
        },
        "weekly_4_4": {
          "target": 592597.0,
          "actual": 548024.0,
          "pct": 0.92
        },
        "weekly_4_5": {
          "target": 539267.0,
          "actual": 800727.0,
          "pct": 1.48
        },
        "weekly_5_1": {
          "target": 557950.0,
          "actual": 1031083.0,
          "pct": 1.85
        },
        "weekly_5_2": {
          "target": 557950.0,
          "actual": 981651.0,
          "pct": 1.76
        },
        "weekly_5_3": {
          "target": 557950.0,
          "actual": 759647.0,
          "pct": 1.36
        },
        "weekly_5_4": {
          "target": 557950.0,
          "actual": 826399.0,
          "pct": 1.48
        },
        "weekly_6_1": {
          "target": 840000.0,
          "actual": 585097.0,
          "pct": 0.7
        },
        "weekly_6_2": {
          "target": 1000000.0,
          "actual": 667372.0,
          "pct": 0.67
        },
        "weekly_6_3": {
          "target": 1000000.0,
          "actual": 671795.0,
          "pct": 0.67
        },
        "weekly_6_4": {
          "target": 1000000.0,
          "actual": 517089.0,
          "pct": 0.52
        },
        "weekly_7_1": {
          "target": 480000.0,
          "actual": 415451.0,
          "pct": 0.87
        },
        "weekly_7_2": {
          "target": 480000.0,
          "actual": 560737.0,
          "pct": 1.17
        },
        "weekly_7_3": {
          "target": 480000.0,
          "actual": 571622.0,
          "pct": 1.19
        },
        "weekly_7_4": {
          "target": 480000.0
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "Số lượng view trên nền tảng Spotify": {
      "title": "ROI",
      "unit": "Tăng trưởng cộng đồng theo kế hoạch",
      "formula": "Dự án nhóm 2",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.43,
          "actual": 8130.0,
          "pct": 3050.0
        },
        "monthly_3": {
          "target": 17832.0,
          "actual": 29530.0,
          "pct": 1.66
        },
        "monthly_4": {
          "target": 22659.0
        },
        "yearly_2026": {
          "target": 66751.0,
          "actual": 64739.0,
          "pct": 0.9699
        },
        "quarterly_1": {
          "target": 67976.0
        },
        "weekly_1_1": {
          "target": 8130.0,
          "actual": 5305.0,
          "pct": 0.65
        },
        "weekly_1_2": {
          "target": 8130.0,
          "actual": 4336.0,
          "pct": 0.53
        },
        "weekly_1_4": {
          "target": 0.38
        },
        "weekly_1_5": {
          "pct": 16399.0
        },
        "weekly_1_6": {
          "target": 18810.0,
          "actual": 1.15,
          "pct": 4100.0
        },
        "weekly_2_1": {
          "target": 3350.0,
          "actual": 0.82,
          "pct": 4100.0
        },
        "weekly_2_2": {
          "target": 3867.0,
          "actual": 0.94,
          "pct": 4100.0
        },
        "weekly_2_3": {
          "target": 4718.0,
          "actual": 1.15,
          "pct": 4100.0
        },
        "weekly_2_4": {
          "target": 7018.0,
          "actual": 1.71
        },
        "weekly_3_1": {
          "target": 4458.0,
          "actual": 13249.0,
          "pct": 2.97
        },
        "weekly_3_2": {
          "target": 4458.0,
          "actual": 7829.0,
          "pct": 1.76
        },
        "weekly_3_3": {
          "target": 4458.0,
          "actual": 8452.0,
          "pct": 1.9
        },
        "weekly_3_4": {
          "target": 4458.0,
          "actual": 16704.0,
          "pct": 3.75
        },
        "weekly_4_1": {
          "target": 5665.0
        }
      }
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM4-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số vi phạm chính sách",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Phát triển thương hiệu Tổng Công ty": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt ngưỡng 2k $/ tháng",
      "formula": "DM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0
        },
        "monthly_3": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 3.0
        },
        "quarterly_2": {
          "target": 3.0
        },
        "weekly_1_1": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 0.0
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "DM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_5": {
          "pct": 0.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt ngưỡng 2k $/ tháng toàn hệ thống",
      "formula": "DM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 5.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 4.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 0.0
        }
      }
    },
    "Số vi phạm trên kênh : TKT, gậy CĐ, gậy BQ, chết kênh...do đơn vị quản lý": {
      "title": "Số vi phạm chính sách",
      "unit": "",
      "formula": "Dự án nhóm 1",
      "pic": "Ngày",
      "periods": {
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "Dự án 1": {
      "title": "Số vi phạm chính sách",
      "unit": "",
      "formula": "Dự án nhóm 3",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 1.5
        },
        "monthly_3": {
          "target": 1.5
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 1.5
        },
        "quarterly_1": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 1.5
        },
        "weekly_1_6": {
          "target": 1.5,
          "actual": 1.0
        }
      }
    },
    "VM4-I02.03": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 2.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 3.0
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 4.0,
          "actual": 1.0
        },
        "quarterly_1": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "Số kênh kinh doanh mở mới trong kỳ": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh trả lại",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.95,
          "actual": 1.0
        },
        "monthly_4": {
          "target": 0.95,
          "actual": 0.74,
          "pct": 0.78
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 0.98,
          "pct": 1.0316
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 0.67,
          "pct": 0.7
        },
        "quarterly_2": {
          "target": 0.95
        },
        "weekly_1_5": {
          "pct": 0.9
        },
        "weekly_1_6": {
          "target": 0.94
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 2.0
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.75
        },
        "monthly_3": {
          "target": 1.75
        },
        "yearly_2026": {
          "target": 1.75
        },
        "weekly_1_5": {
          "pct": 1.75
        },
        "weekly_1_6": {
          "target": 1.5
        }
      }
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "DM4-I02.03",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "DM4-I02.03",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "DM4-I02.03",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "Số vi phạm chính sách",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    }
  },
  "Lego": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 0.3657,
          "actual": -0.3822,
          "pct": -1.0451
        },
        "monthly_4": {
          "actual": -0.2386
        },
        "monthly_5": {
          "actual": -0.0534
        },
        "monthly_6": {
          "actual": -0.2719
        },
        "yearly_2026": {
          "target": 0.2672,
          "actual": -0.2949,
          "pct": -1.1036
        },
        "quarterly_1": {
          "target": 0.5471,
          "actual": -0.1913,
          "pct": -0.3496
        },
        "quarterly_2": {
          "target": 0.7587
        },
        "weekly_1_5": {
          "pct": 0.2916
        },
        "weekly_1_6": {
          "target": -0.35,
          "actual": -1.2003
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 1.0
        },
        "monthly_3": {
          "target": 0.2678,
          "actual": -0.6186,
          "pct": -2.3102
        },
        "monthly_4": {
          "target": 1.0,
          "actual": -0.3133,
          "pct": -0.3133
        },
        "monthly_5": {
          "target": 1.0,
          "actual": -0.0564,
          "pct": -0.0564
        },
        "monthly_6": {
          "target": 1.0,
          "actual": -0.3735,
          "pct": -0.3735
        },
        "monthly_7": {
          "target": 1.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 1.0
        },
        "monthly_10": {
          "actual": 1.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 0.2109,
          "actual": -0.4182,
          "pct": -1.9833
        },
        "quarterly_1": {
          "target": 0.3536,
          "actual": -0.2365,
          "pct": -0.6688
        },
        "quarterly_2": {
          "target": 0.4314
        },
        "weekly_1_5": {
          "pct": 0.2258
        },
        "weekly_1_6": {
          "target": -0.5384,
          "actual": -2.3849
        },
        "weekly_7_6": {
          "actual": 1.0
        }
      }
    },
    "TM1-I01.03": {
      "title": "ROI",
      "unit": "ROI (Không tính CPC)",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 0.5401,
          "actual": -0.0733,
          "pct": -0.1357
        },
        "monthly_4": {
          "actual": 0.1636
        },
        "yearly_2026": {
          "target": 0.409,
          "actual": 0.0646,
          "pct": 0.158
        },
        "weekly_1_5": {
          "pct": 0.4304
        },
        "weekly_1_6": {
          "target": -0.0216,
          "actual": -0.0501
        }
      }
    },
    "TM1-I01.04": {
      "title": "ROI",
      "unit": "ROS (Không tính CPC)",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 1.0
        },
        "monthly_3": {
          "target": 0.3507,
          "actual": -0.0791,
          "pct": -0.2255
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 0.1406,
          "pct": 0.1406
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 1.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 1.0
        },
        "monthly_10": {
          "actual": 1.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 0.2903,
          "actual": 0.0607,
          "pct": 0.2092
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 0.3009
        },
        "weekly_1_6": {
          "target": -0.022,
          "actual": -0.0732
        },
        "weekly_7_6": {
          "actual": 1.0
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "2.1": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 2530354321.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.7737,
          "actual": 108437581.0,
          "pct": 98394410.0
        },
        "monthly_3": {
          "target": 559618895.0,
          "actual": 259480295.0,
          "pct": 0.4637
        },
        "monthly_4": {
          "target": 600129530.0,
          "actual": 285296775.0,
          "pct": 0.4754
        },
        "monthly_5": {
          "target": 653064987.0,
          "actual": 298843085.0,
          "pct": 0.46
        },
        "monthly_6": {
          "target": 680249440.0,
          "actual": 232987696.0,
          "pct": 0.3425
        },
        "monthly_7": {
          "target": 699925005.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 779894505.0,
          "pct": 0.0
        },
        "monthly_9": {
          "actual": 800415265.0,
          "pct": 0.0
        },
        "monthly_10": {
          "actual": 849974223.0,
          "pct": 0.0
        },
        "monthly_11": {
          "actual": 879964833.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 1592211349.0,
          "actual": 915909207.0,
          "pct": 0.5752
        },
        "quarterly_1": {
          "target": 1933443957.0,
          "actual": 817127556.0,
          "pct": 0.4226
        },
        "quarterly_2": {
          "target": 2229919835.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 108437581.0,
          "actual": 77764672.0,
          "pct": 0.7171
        },
        "weekly_1_2": {
          "target": 108437581.0,
          "actual": 77809772.0,
          "pct": 0.7176
        },
        "weekly_1_4": {
          "target": 0.9074
        },
        "weekly_1_5": {
          "pct": 532532660.0
        },
        "weekly_1_6": {
          "target": 275203508.0,
          "actual": 0.5168,
          "pct": 133133165.0
        },
        "weekly_2_1": {
          "target": 77673945.0,
          "actual": 0.5834,
          "pct": 137534313.0
        },
        "weekly_2_2": {
          "target": 72433922.0,
          "actual": 0.5267,
          "pct": 137534313.0
        },
        "weekly_2_3": {
          "target": 62797268.0,
          "actual": 0.4566,
          "pct": 137534313.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 76673945.0,
          "actual": 43568059.0,
          "pct": 0.568
        },
        "weekly_3_2": {
          "target": 130577742.0,
          "actual": 52196405.0,
          "pct": 0.4
        },
        "weekly_3_3": {
          "target": 125709387.0,
          "actual": 55467894.0,
          "pct": 0.441
        },
        "weekly_3_4": {
          "target": 125709387.0,
          "actual": 47385715.0,
          "pct": 0.377
        },
        "weekly_3_5": {
          "target": 53875452.0
        },
        "weekly_4_1": {
          "target": 150488285.0,
          "actual": 37001602.0,
          "pct": 0.2459
        },
        "weekly_4_2": {
          "target": 169072458.0,
          "actual": 28000618.0,
          "pct": 0.1656
        },
        "weekly_4_3": {
          "target": 169072458.0,
          "actual": 33160357.0,
          "pct": 0.1961
        },
        "weekly_4_4": {
          "target": 169072458.0,
          "actual": 29978297.0,
          "pct": 0.1773
        },
        "weekly_4_5": {
          "target": 120766042.0,
          "actual": 18583377.0,
          "pct": 0.1539
        },
        "weekly_5_1": {
          "target": 163266247.0,
          "actual": 27902950.0,
          "pct": 0.1709
        },
        "weekly_5_2": {
          "target": 163266247.0,
          "actual": 35428471.0,
          "pct": 0.217
        },
        "weekly_5_3": {
          "target": 163266247.0,
          "actual": 25641499.0,
          "pct": 0.1571
        },
        "weekly_5_4": {
          "target": 163266247.0
        },
        "weekly_6_1": {
          "target": 170062360.0,
          "actual": 37396807.0,
          "pct": 0.2199
        },
        "weekly_6_2": {
          "target": 170062360.0,
          "actual": 39011048.0,
          "pct": 0.2294
        },
        "weekly_6_3": {
          "target": 170062360.0,
          "actual": 40150050.0,
          "pct": 0.2361
        },
        "weekly_6_4": {
          "target": 170062360.0,
          "actual": 44287985.0,
          "pct": 0.2604
        },
        "weekly_7_1": {
          "target": 86668234.0,
          "actual": 23223070.0,
          "pct": 0.268
        },
        "weekly_7_2": {
          "target": 151669409.0,
          "actual": 35624541.0,
          "pct": 0.2349
        },
        "weekly_7_3": {
          "target": 151669409.0,
          "actual": 35123985.0,
          "pct": 0.2316
        },
        "weekly_7_4": {
          "target": 151669409.0
        },
        "weekly_7_6": {
          "actual": 750100325.0,
          "pct": 0.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu nội bộ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 2530354321.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.7737,
          "actual": 108437581.0,
          "pct": 98394410.0
        },
        "monthly_3": {
          "target": 559618895.0,
          "actual": 259480295.0,
          "pct": 0.4637
        },
        "monthly_4": {
          "target": 600129530.0,
          "actual": 144903844.0,
          "pct": 0.2415
        },
        "monthly_5": {
          "target": 653064987.0,
          "actual": 138843085.0,
          "pct": 0.21
        },
        "monthly_6": {
          "target": 680249440.0,
          "actual": 111538407.0,
          "pct": 0.164
        },
        "monthly_7": {
          "target": 699925005.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 779894505.0
        },
        "monthly_9": {
          "actual": 800415265.0
        },
        "monthly_10": {
          "actual": 849974223.0
        },
        "monthly_11": {
          "actual": 879964833.0
        },
        "yearly_2026": {
          "target": 1592211349.0,
          "actual": 915909207.0,
          "pct": 0.5752
        },
        "quarterly_1": {
          "target": 1933443957.0,
          "actual": 395285336.0,
          "pct": 0.2044
        },
        "quarterly_2": {
          "target": 2229919835.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 108437581.0,
          "actual": 77764672.0,
          "pct": 0.7171
        },
        "weekly_1_2": {
          "target": 108437581.0,
          "actual": 77809772.0,
          "pct": 0.7176
        },
        "weekly_1_4": {
          "target": 0.9074
        },
        "weekly_1_5": {
          "actual": 1.0,
          "pct": 532532660.0
        },
        "weekly_1_6": {
          "target": 275203508.0,
          "actual": 0.5168,
          "pct": 133133165.0
        },
        "weekly_2_1": {
          "target": 77673945.0,
          "actual": 0.5834,
          "pct": 137534313.0
        },
        "weekly_2_2": {
          "target": 72433922.0,
          "actual": 0.5267,
          "pct": 137534313.0
        },
        "weekly_2_3": {
          "target": 62797268.0,
          "actual": 0.4566,
          "pct": 137534313.0
        },
        "weekly_2_4": {
          "target": 61333511.0,
          "actual": 0.446
        },
        "weekly_2_5": {
          "pct": 1.0
        },
        "weekly_3_1": {
          "target": 76673945.0,
          "actual": 43568059.0,
          "pct": 0.568
        },
        "weekly_3_2": {
          "target": 130577742.0,
          "actual": 52196405.0,
          "pct": 0.4
        },
        "weekly_3_3": {
          "target": 125709387.0,
          "actual": 55467894.0,
          "pct": 0.441
        },
        "weekly_3_4": {
          "target": 125709387.0,
          "actual": 47385715.0,
          "pct": 0.377
        },
        "weekly_3_5": {
          "target": 53875452.0
        },
        "weekly_4_1": {
          "target": 150488285.0,
          "actual": 37001602.0,
          "pct": 0.2459
        },
        "weekly_4_2": {
          "target": 169072458.0,
          "actual": 28000618.0,
          "pct": 0.1656
        },
        "weekly_4_3": {
          "target": 169072458.0,
          "actual": 33160357.0,
          "pct": 0.1961
        },
        "weekly_4_4": {
          "target": 169072458.0,
          "actual": 29978297.0,
          "pct": 0.1773
        },
        "weekly_4_5": {
          "target": 120766042.0,
          "actual": 18583377.0,
          "pct": 0.1539
        },
        "weekly_5_1": {
          "target": 163266247.0,
          "actual": 27902950.0,
          "pct": 0.1709
        },
        "weekly_5_2": {
          "target": 163266247.0,
          "actual": 35428471.0,
          "pct": 0.217
        },
        "weekly_5_3": {
          "target": 163266247.0,
          "actual": 25641499.0,
          "pct": 0.1571
        },
        "weekly_5_4": {
          "target": 163266247.0
        },
        "weekly_6_1": {
          "target": 170062360.0,
          "actual": 22396807.0,
          "pct": 0.1317
        },
        "weekly_6_2": {
          "target": 170062360.0,
          "actual": 24011048.0,
          "pct": 0.1412
        },
        "weekly_6_3": {
          "target": 170062360.0,
          "actual": 25150050.0,
          "pct": 0.1479
        },
        "weekly_6_4": {
          "target": 170062360.0,
          "actual": 29287985.0,
          "pct": 0.1722
        },
        "weekly_6_5": {
          "target": 356750.0
        },
        "weekly_7_1": {
          "target": 86668234.0,
          "actual": 15223070.0,
          "pct": 0.1756
        },
        "weekly_7_2": {
          "target": 151669409.0,
          "actual": 20624541.0,
          "pct": 0.136
        },
        "weekly_7_3": {
          "target": 151669409.0,
          "actual": 17123985.0,
          "pct": 0.1129
        },
        "weekly_7_4": {
          "target": 151669409.0
        },
        "weekly_7_6": {
          "actual": 750100325.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu chéo",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0
        },
        "monthly_5": {
          "target": 0.0
        },
        "monthly_6": {
          "target": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0
        },
        "quarterly_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "actual": 381225404.0,
          "pct": 0.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "VM1-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu đối tác",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 140392931.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 160000000.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 121449289.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 421842220.0
        },
        "quarterly_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_6_1": {
          "actual": 15000000.0
        },
        "weekly_6_2": {
          "actual": 15000000.0
        },
        "weekly_6_3": {
          "actual": 15000000.0
        },
        "weekly_6_4": {
          "actual": 15000000.0
        },
        "weekly_7_1": {
          "actual": 8000000.0
        },
        "weekly_7_2": {
          "actual": 15000000.0
        },
        "weekly_7_3": {
          "actual": 18000000.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 0.6719,
          "actual": 0.5141,
          "pct": 0.7651
        },
        "monthly_4": {
          "actual": 0.5578
        },
        "monthly_5": {
          "actual": 0.5206
        },
        "monthly_6": {
          "actual": 0.5
        },
        "yearly_2026": {
          "target": 0.6923,
          "actual": 0.5356,
          "pct": 0.7736
        },
        "quarterly_1": {
          "target": 0.671,
          "actual": 0.5279,
          "pct": 0.7867
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.7015
        },
        "weekly_1_6": {
          "target": 0.5543,
          "actual": 0.7901
        }
      }
    },
    "ROS = [Tổng doanh thu - tổng chi phí (-CPC)]/Tổng doanh thu": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0365
        },
        "monthly_4": {
          "actual": 0.0347
        },
        "monthly_5": {
          "actual": 0.0327
        },
        "monthly_6": {
          "actual": 0.0313
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0125
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.011
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0512
        }
      }
    },
    "Tối ưu chi phí sản xuất (Thường)": {
      "title": "ROI",
      "unit": "Tối ưu chi phí sản xuất",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0203
        },
        "monthly_4": {
          "actual": 0.0186
        },
        "monthly_5": {
          "actual": 0.0175
        },
        "monthly_6": {
          "actual": 0.0162
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0075
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0058
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.032
        }
      }
    },
    "Tối ưu chi phí sản xuất (Thường + AI)": {
      "title": "Tổng doanh thu",
      "unit": "Tổng chi phí nhân sự",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_3": {
          "target": 275321009.0,
          "actual": 215916171.0,
          "pct": 0.7842
        },
        "monthly_4": {
          "actual": 209004982.0
        },
        "monthly_5": {
          "actual": 164347474.0
        },
        "monthly_6": {
          "actual": 160000000.0
        },
        "yearly_2026": {
          "target": 869901114.0,
          "actual": 695728464.0,
          "pct": 0.7998
        },
        "quarterly_1": {
          "target": 838568182.0,
          "actual": 533352456.0,
          "pct": 0.636
        },
        "weekly_1_5": {
          "pct": 289251098.0
        },
        "weekly_1_6": {
          "target": 234661301.0,
          "actual": 0.8113
        }
      }
    },
    "VM1-I05.05": {
      "title": "Tổng doanh thu",
      "unit": "Giá vốn bán hàng",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "actual": 230000000.0
        },
        "monthly_4": {
          "actual": 195000000.0
        },
        "monthly_5": {
          "actual": 155000000.0
        },
        "monthly_6": {
          "actual": 150000000.0
        },
        "yearly_2026": {
          "actual": 683555221.0
        },
        "quarterly_1": {
          "actual": 500000000.0
        },
        "weekly_1_6": {
          "target": 216569120.0
        }
      }
    },
    "VM1-I05.06": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sản xuất 1 ND (Thường)",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 15333333.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 13000000.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 10333333.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 10000000.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 16275124.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 11111111.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 21656912.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "VM1-I05.07": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sản xuất 1 ND (Thường)",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 8518519.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 6964286.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 5535714.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 5172414.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 9765075.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 5882353.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 13535570.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "VM1-I05.08": {
      "title": "Tổng doanh thu",
      "unit": "Tổng chi phí đơn vị",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 409766577.0,
          "actual": 420000000.0,
          "pct": 1.025
        },
        "monthly_4": {
          "actual": 374690630.0
        },
        "monthly_5": {
          "actual": 315686227.0
        },
        "monthly_6": {
          "actual": 320000000.0
        },
        "yearly_2026": {
          "target": 1256461824.0,
          "actual": 1298960192.0,
          "pct": 1.0338
        },
        "quarterly_1": {
          "target": 1249716208.0,
          "actual": 1010376857.0,
          "pct": 0.8085
        },
        "quarterly_2": {
          "target": 1267961769.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 412311767.0
        },
        "weekly_1_6": {
          "target": 423375395.0,
          "actual": 1.0268
        }
      }
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "VM1-I05.09": {
      "title": "Tổng doanh thu",
      "unit": "Tổng chi phí đơn vị (Không tính CPC)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 363359031.0,
          "actual": 280000000.0,
          "pct": 0.7706
        },
        "monthly_4": {
          "actual": 245191141.0
        },
        "yearly_2026": {
          "target": 1130044710.0,
          "actual": 860303571.0,
          "pct": 0.7613
        },
        "weekly_1_5": {
          "pct": 372306983.0
        },
        "weekly_1_6": {
          "target": 281265214.0,
          "actual": 0.7555
        }
      }
    },
    "VM1-I05.11": {
      "title": "Tổng doanh thu",
      "unit": "Tổng lợi nhuận đơn vị (Không tính CPC)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2530354321.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 196259864.0,
          "actual": -20519705.0,
          "pct": -0.1046
        },
        "monthly_4": {
          "target": 600129530.0,
          "actual": 40105634.0,
          "pct": 0.0668
        },
        "monthly_5": {
          "target": 653064987.0,
          "actual": 298843085.0,
          "pct": 0.4576
        },
        "monthly_6": {
          "target": 680249440.0,
          "actual": 232987696.0,
          "pct": 0.3425
        },
        "monthly_7": {
          "target": 699925005.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 779894505.0,
          "pct": 0.0
        },
        "monthly_9": {
          "actual": 800415265.0,
          "pct": 0.0
        },
        "monthly_10": {
          "actual": 849974223.0,
          "pct": 0.0
        },
        "monthly_11": {
          "actual": 879964833.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 462166639.0,
          "actual": 55605636.0,
          "pct": 0.12
        },
        "quarterly_1": {
          "target": 1933443957.0,
          "actual": 817127556.0,
          "pct": 0.423
        },
        "quarterly_2": {
          "target": 2229919835.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 160225677.0
        },
        "weekly_1_6": {
          "target": -6061706.0,
          "actual": -0.0378
        },
        "weekly_7_6": {
          "actual": 750100325.0,
          "pct": 0.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.175
        },
        "weekly_1_5": {
          "actual": 0.25
        },
        "weekly_1_6": {
          "actual": 0.175
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 53.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 4.0,
          "pct": 6.0
        },
        "monthly_3": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 16.0,
          "pct": 1.0
        },
        "monthly_8": {
          "actual": 17.0
        },
        "monthly_9": {
          "actual": 17.0
        },
        "monthly_10": {
          "actual": 18.0
        },
        "monthly_11": {
          "actual": 18.0
        },
        "yearly_2026": {
          "target": 38.0,
          "actual": 42.0,
          "pct": 1.105
        },
        "quarterly_1": {
          "target": 45.0,
          "actual": 45.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 49.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.5
        },
        "weekly_1_5": {
          "actual": 0.6,
          "pct": 8.0
        },
        "weekly_1_6": {
          "target": 10.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "target": 4.0,
          "actual": 2.0
        },
        "weekly_2_5": {
          "pct": 0.6
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 2.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 1.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0
        },
        "weekly_7_6": {
          "actual": 16.0,
          "target": 1.0
        },
        "weekly_8_6": {
          "target": 1.0
        },
        "weekly_9_6": {
          "target": 1.0
        },
        "weekly_10_6": {
          "target": 1.0
        }
      }
    },
    "VM2-I01.04": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 15.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 5.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 5.0
        },
        "monthly_9": {
          "actual": 5.0
        },
        "monthly_10": {
          "actual": 5.0
        },
        "monthly_11": {
          "actual": 5.0
        },
        "yearly_2026": {
          "target": 13.0,
          "actual": 10.0,
          "pct": 0.769
        },
        "quarterly_1": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 15.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 2.0,
          "actual": 0.6667,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 1.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 0.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        },
        "weekly_7_6": {
          "actual": 5.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Số lượng video AI PET hoàn thành sản xuất": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 29.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 9.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 9.0
        },
        "monthly_9": {
          "actual": 9.0
        },
        "monthly_10": {
          "actual": 10.0
        },
        "monthly_11": {
          "actual": 10.0
        },
        "yearly_2026": {
          "target": 19.0,
          "actual": 18.0,
          "pct": 0.947
        },
        "quarterly_1": {
          "target": 25.0,
          "actual": 25.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 27.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "pct": 5.0
        },
        "weekly_1_6": {
          "target": 4.0,
          "actual": 0.8,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 2.0
        },
        "weekly_2_2": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 2.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 0.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        },
        "weekly_7_6": {
          "actual": 9.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Số lượng video AI TĐH hoàn thành sản xuất": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 97.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.7143,
          "actual": 8.0,
          "pct": 10.0
        },
        "monthly_3": {
          "target": 27.0,
          "actual": 27.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 28.0,
          "actual": 28.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 28.0,
          "actual": 28.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 29.0,
          "actual": 29.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 30.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 31.0
        },
        "monthly_9": {
          "actual": 31.0
        },
        "monthly_10": {
          "actual": 33.0
        },
        "monthly_11": {
          "actual": 33.0
        },
        "yearly_2026": {
          "target": 70.0,
          "actual": 70.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 85.0,
          "actual": 85.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 91.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.25
        },
        "weekly_1_5": {
          "pct": 16.0
        },
        "weekly_1_6": {
          "target": 16.0,
          "actual": 1.0,
          "pct": 5.0
        },
        "weekly_2_1": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 6.0
        },
        "weekly_2_2": {
          "target": 6.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 4.0,
          "actual": 1.0
        },
        "weekly_3_1": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 2.0
        },
        "weekly_4_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 6.0,
          "actual": 6.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 7.0
        },
        "weekly_6_1": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 1.0
        },
        "weekly_7_1": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 6.0
        },
        "weekly_7_6": {
          "actual": 30.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "VM2-I02.02": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng X views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 24.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 6.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 7.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 8.0
        },
        "monthly_9": {
          "actual": 8.0
        },
        "monthly_10": {
          "actual": 8.0
        },
        "monthly_11": {
          "actual": 8.0
        },
        "yearly_2026": {
          "target": 16.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 21.0,
          "actual": 21.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 22.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 4.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.3
        },
        "weekly_7_6": {
          "actual": 7.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM3-I01.03": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng video upload",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 42.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 1.0,
          "actual": 4.0,
          "pct": 4.0
        },
        "monthly_3": {
          "target": 14.0,
          "actual": 14.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 14.0,
          "actual": 14.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 14.0,
          "actual": 18.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 14.0,
          "actual": 14.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 14.0,
          "pct": 1.0
        },
        "monthly_8": {
          "actual": 14.0
        },
        "monthly_9": {
          "actual": 14.0
        },
        "monthly_10": {
          "actual": 14.0
        },
        "monthly_11": {
          "actual": 14.0
        },
        "yearly_2026": {
          "target": 42.0,
          "actual": 46.0,
          "pct": 1.095
        },
        "quarterly_1": {
          "target": 42.0,
          "actual": 46.0,
          "pct": 1.095
        },
        "quarterly_2": {
          "target": 42.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 1.0
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 14.0
        },
        "weekly_1_6": {
          "target": 14.0,
          "actual": 1.0,
          "pct": 2.0
        },
        "weekly_2_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_3": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 4.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.1
        },
        "weekly_3_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_3_5": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_4": {
          "target": 4.0
        },
        "weekly_6_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_6_5": {
          "target": 1.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_4": {
          "target": 4.0
        },
        "weekly_7_6": {
          "actual": 14.0,
          "target": 1.0
        },
        "weekly_8_6": {
          "target": 1.0
        },
        "weekly_9_6": {
          "target": 1.0
        },
        "weekly_10_6": {
          "target": 1.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.1915
        },
        "weekly_1_5": {
          "actual": 0.25
        },
        "weekly_1_6": {
          "actual": 0.2209
        },
        "weekly_2_5": {
          "pct": 0.25
        }
      }
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Số lượng video (Thường + AI) hoàn thành sản xuất": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic BP WF",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 81343000.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 2.1739,
          "actual": 5152903.0,
          "pct": 8662066.0
        },
        "monthly_3": {
          "target": 24045350.0,
          "actual": 15000000.0,
          "pct": 0.6238
        },
        "monthly_4": {
          "target": 22955300.0,
          "actual": 2023914.0,
          "pct": 0.0882
        },
        "monthly_5": {
          "target": 24385200.0,
          "actual": 2048422.0,
          "pct": 0.084
        },
        "monthly_6": {
          "target": 24835350.0,
          "actual": 1841329.0,
          "pct": 0.0741
        },
        "monthly_7": {
          "target": 25425050.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 25986550.0
        },
        "monthly_9": {
          "actual": 26036800.0
        },
        "monthly_10": {
          "actual": 27317700.0
        },
        "monthly_11": {
          "actual": 27988500.0
        },
        "yearly_2026": {
          "target": 70721500.0,
          "actual": 84792956.0,
          "pct": 1.199
        },
        "quarterly_1": {
          "target": 72175850.0,
          "actual": 5913665.0,
          "pct": 0.082
        },
        "quarterly_2": {
          "target": 77117350.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 5152903.0,
          "actual": 11092720.0,
          "pct": 2.1527
        },
        "weekly_1_2": {
          "target": 5152903.0,
          "actual": 8855567.0,
          "pct": 1.7186
        },
        "weekly_1_4": {
          "target": 1.681
        },
        "weekly_1_5": {
          "actual": 0.6,
          "pct": 23855100.0
        },
        "weekly_1_6": {
          "target": 23547217.0,
          "actual": 0.9871,
          "pct": 5963775.0
        },
        "weekly_2_1": {
          "target": 5603553.0,
          "actual": 0.9396,
          "pct": 5963775.0
        },
        "weekly_2_2": {
          "target": 7545374.0,
          "actual": 1.2652,
          "pct": 5963775.0
        },
        "weekly_2_3": {
          "target": 6971876.0,
          "actual": 1.169,
          "pct": 5963775.0
        },
        "weekly_2_4": {
          "target": 3871305.0,
          "actual": 0.6491
        },
        "weekly_2_5": {
          "pct": 0.6
        },
        "weekly_3_1": {
          "target": 5603553.0,
          "actual": 3822822.0,
          "pct": 0.682
        },
        "weekly_3_2": {
          "target": 5603553.0,
          "actual": 2286611.0,
          "pct": 0.408
        },
        "weekly_3_3": {
          "target": 5603553.0,
          "actual": 1989755.0,
          "pct": 0.355
        },
        "weekly_3_4": {
          "target": 5603553.0,
          "actual": 2749705.0,
          "pct": 0.491
        },
        "weekly_3_5": {
          "target": 2326969.0
        },
        "weekly_4_1": {
          "target": 5228747.0,
          "actual": 1517490.0,
          "pct": 0.2902
        },
        "weekly_4_2": {
          "target": 5356237.0,
          "actual": 465860.0,
          "pct": 0.087
        },
        "weekly_4_3": {
          "target": 5356237.0,
          "actual": 580152.0,
          "pct": 0.1083
        },
        "weekly_4_4": {
          "target": 5356237.0,
          "actual": 525667.0,
          "pct": 0.0981
        },
        "weekly_4_5": {
          "target": 3825883.0,
          "actual": 310246.0,
          "pct": 0.0811
        },
        "weekly_5_1": {
          "target": 6096300.0,
          "actual": 448161.0,
          "pct": 0.0735
        },
        "weekly_5_2": {
          "target": 6096300.0,
          "actual": 474071.0,
          "pct": 0.0778
        },
        "weekly_5_3": {
          "target": 6096300.0,
          "actual": 404053.0,
          "pct": 0.0663
        },
        "weekly_5_4": {
          "target": 6096300.0
        },
        "weekly_6_1": {
          "target": 6208839.0,
          "actual": 435892.0,
          "pct": 0.0702
        },
        "weekly_6_2": {
          "target": 6208839.0,
          "actual": 443115.0,
          "pct": 0.0714
        },
        "weekly_6_3": {
          "target": 6208839.0,
          "actual": 389855.0,
          "pct": 0.0628
        },
        "weekly_6_4": {
          "target": 6208839.0,
          "actual": 490454.0,
          "pct": 0.079
        },
        "weekly_6_5": {
          "target": 208000.0
        },
        "weekly_7_1": {
          "target": 3280652.0,
          "actual": 280201.0,
          "pct": 0.0854
        },
        "weekly_7_2": {
          "target": 5741140.0,
          "actual": 391141.0,
          "pct": 0.0681
        },
        "weekly_7_3": {
          "target": 5741140.0,
          "actual": 392644.0,
          "pct": 0.0684
        },
        "weekly_7_4": {
          "target": 5741140.0
        },
        "weekly_7_6": {
          "actual": 25705750.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Traffic sản phẩm English Stories": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Traffic Lego",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {}
    },
    "VM3-I01.04": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 8.7,
          "pct": 0.0
        },
        "monthly_2": {
          "actual": 7.8,
          "pct": 6.5
        },
        "monthly_3": {
          "target": 8.0,
          "actual": 9.0,
          "pct": 1.125
        },
        "monthly_4": {
          "target": 8.0,
          "actual": 8.8,
          "pct": 1.1
        },
        "monthly_5": {
          "target": 8.1,
          "actual": 8.8,
          "pct": 1.0864
        },
        "monthly_6": {
          "target": 8.2,
          "actual": 8.8,
          "pct": 1.0732
        },
        "monthly_7": {
          "target": 8.2,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 8.4
        },
        "monthly_9": {
          "actual": 8.5
        },
        "monthly_10": {
          "actual": 8.6
        },
        "monthly_11": {
          "actual": 8.7
        },
        "yearly_2026": {
          "target": 8.0,
          "actual": 7.5,
          "pct": 0.931
        },
        "quarterly_1": {
          "target": 8.2,
          "actual": 8.8,
          "pct": 1.073
        },
        "quarterly_2": {
          "target": 8.4,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 7.8,
          "actual": 7.675
        },
        "weekly_1_2": {
          "target": 7.8,
          "actual": 6.525
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 7.9
        },
        "weekly_1_6": {
          "target": 6.1,
          "actual": 0.7683,
          "pct": 7.9
        },
        "weekly_2_1": {
          "target": 7.8,
          "actual": 0.9873,
          "pct": 7.9
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 7.9
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 7.9
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_3_1": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 8.0,
          "actual": 7.9,
          "pct": 0.988
        },
        "weekly_3_3": {
          "target": 8.0
        },
        "weekly_4_1": {
          "target": 8.0,
          "actual": 9.0,
          "pct": 1.125
        },
        "weekly_4_2": {
          "target": 8.0
        },
        "weekly_7_6": {
          "actual": 8.3,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM3-I01.03": {
      "title": "ROI",
      "unit": "Tỉ lệ chuyển đổi (CTR)- 24h",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 52.0,
          "pct": 0.0
        },
        "monthly_2": {
          "actual": 48.0,
          "pct": 28.25
        },
        "monthly_3": {
          "target": 48.0,
          "actual": 40.0,
          "pct": 0.8333
        },
        "monthly_4": {
          "target": 48.0,
          "actual": 50.0,
          "pct": 1.0417
        },
        "monthly_5": {
          "target": 49.0,
          "actual": 50.0,
          "pct": 1.0204
        },
        "monthly_6": {
          "target": 50.0,
          "actual": 48.0,
          "pct": 0.96
        },
        "monthly_7": {
          "target": 0.5,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 50.0
        },
        "monthly_9": {
          "actual": 50.0
        },
        "monthly_10": {
          "actual": 51.0
        },
        "monthly_11": {
          "actual": 52.0
        },
        "yearly_2026": {
          "target": 48.0,
          "actual": 38.4,
          "pct": 0.799
        },
        "quarterly_1": {
          "target": 50.0,
          "actual": 49.3,
          "pct": 0.987
        },
        "quarterly_2": {
          "target": 50.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 48.0,
          "actual": 47.5
        },
        "weekly_1_2": {
          "target": 48.0,
          "actual": 51.5
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 48.0
        },
        "weekly_1_6": {
          "target": 33.0,
          "actual": 0.6875,
          "pct": 48.0
        },
        "weekly_2_1": {
          "target": 38.5,
          "actual": 0.8021,
          "pct": 48.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 48.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 48.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_3_1": {
          "target": 48.0,
          "actual": 48.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 48.0,
          "actual": 46.0,
          "pct": 0.958
        },
        "weekly_3_3": {
          "target": 48.0
        },
        "weekly_4_1": {
          "target": 48.0,
          "actual": 35.0,
          "pct": 0.7292
        },
        "weekly_4_2": {
          "target": 48.0
        },
        "weekly_7_6": {
          "actual": 50.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Tỉ lệ giữ chân khách hàng hết ND đầu (APV)- 24h": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Nội dung đạt ngưỡng tỉ lệ chuyển đổi (CTR) - 24h",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 21.0,
          "pct": 0.0
        },
        "monthly_2": {
          "actual": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 9.0,
          "pct": 1.2857
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 7.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 7.0
        },
        "monthly_9": {
          "actual": 7.0
        },
        "monthly_10": {
          "actual": 7.0
        },
        "monthly_11": {
          "actual": 7.0
        },
        "yearly_2026": {
          "target": 21.0,
          "actual": 16.0,
          "pct": 0.762
        },
        "quarterly_1": {
          "target": 21.0,
          "actual": 23.0,
          "pct": 1.095
        },
        "quarterly_2": {
          "target": 21.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 1.0
        },
        "weekly_1_5": {
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 2.0,
          "actual": 0.2857,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 2.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 2.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 1.5,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 1.5
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 4.0,
          "pct": 2.0
        },
        "weekly_4_2": {
          "target": 2.0
        },
        "weekly_7_6": {
          "actual": 7.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Số lượng nội dung đạt ngưỡng tỉ lệ chuyển đổi (CTR) - 24h/ mục tiêu": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Nội dung đạt ngưỡng tỉ lệ giữ chân khách hàng hết ND đầu (APV) - 24h",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 21.0,
          "pct": 0.0
        },
        "monthly_2": {
          "actual": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 7.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 9.0,
          "pct": 1.2857
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 7.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 7.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 7.0
        },
        "monthly_9": {
          "actual": 7.0
        },
        "monthly_10": {
          "actual": 7.0
        },
        "monthly_11": {
          "actual": 7.0
        },
        "yearly_2026": {
          "target": 21.0,
          "actual": 8.0,
          "pct": 0.381
        },
        "quarterly_1": {
          "target": 21.0,
          "actual": 23.0,
          "pct": 1.095
        },
        "quarterly_2": {
          "target": 21.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 2.0,
          "actual": 3.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 3.0
        },
        "weekly_1_5": {
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 0.1429,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 2.0
        },
        "weekly_2_2": {
          "actual": 0.0,
          "pct": 2.0
        },
        "weekly_2_3": {
          "actual": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "actual": 0.0
        },
        "weekly_3_1": {
          "target": 1.5,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 1.5
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_2": {
          "target": 2.0
        },
        "weekly_7_6": {
          "actual": 7.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.09
        },
        "weekly_1_5": {
          "actual": 0.1
        },
        "weekly_1_6": {
          "actual": 0.1
        },
        "weekly_2_5": {
          "pct": 0.1
        }
      }
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 1.0
        },
        "monthly_10": {
          "actual": 1.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 1.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.3
        },
        "weekly_7_6": {
          "actual": 1.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Traffic short": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt ngưỡng 5k$/ tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "monthly_5": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "monthly_6": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 2.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 2.0
        },
        "monthly_9": {
          "actual": 2.0
        },
        "monthly_10": {
          "actual": 2.0
        },
        "monthly_11": {
          "actual": 2.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "quarterly_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 0.5
        },
        "weekly_2_5": {
          "pct": 0.3
        },
        "weekly_7_6": {
          "actual": 2.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "TM4-I02.03": {
      "title": "ROI",
      "unit": "Tỷ lệ kênh đạt chuẩn an toàn (toàn bộ hệ thống)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 90.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 90.0,
          "actual": 1.0,
          "pct": 0.0111
        },
        "monthly_4": {
          "target": 90.0,
          "actual": 90.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.1111
        },
        "monthly_7": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 90.0
        },
        "monthly_9": {
          "actual": 90.0
        },
        "monthly_10": {
          "actual": 90.0
        },
        "monthly_11": {
          "actual": 90.0
        },
        "yearly_2026": {
          "target": 90.0,
          "actual": 60.0,
          "pct": 0.667
        },
        "quarterly_1": {
          "target": 90.0,
          "actual": 90.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 90.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.9
        },
        "weekly_1_6": {
          "target": 0.5,
          "actual": 0.5556
        },
        "weekly_7_6": {
          "actual": 90.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 1.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 6.0,
          "pct": 6.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 1.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 2.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "actual": 0.4,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 4.0,
          "actual": 1.3,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 2.0
        },
        "weekly_2_5": {
          "pct": 0.4
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0
        },
        "weekly_7_6": {
          "actual": 1.0,
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM4-I02.03": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh mở mới",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "quarterly_2": {
          "target": 1.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_2_3": {
          "pct": 1.0
        },
        "weekly_7_6": {
          "actual": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        }
      }
    },
    "Số kênh kinh doanh mở mới trong kỳ": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh trả lại",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 1.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 12.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 12.0,
          "actual": 7.0,
          "pct": 0.5833
        },
        "monthly_4": {
          "target": 12.0,
          "actual": 4.0,
          "pct": 0.3333
        },
        "monthly_5": {
          "target": 12.0,
          "actual": 5.0,
          "pct": 0.4167
        },
        "monthly_6": {
          "target": 12.0,
          "actual": 6.0,
          "pct": 0.5
        },
        "monthly_7": {
          "target": 12.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 12.0
        },
        "monthly_9": {
          "actual": 12.0
        },
        "monthly_10": {
          "actual": 12.0
        },
        "monthly_11": {
          "actual": 12.0
        },
        "yearly_2026": {
          "target": 12.0,
          "actual": 7.0,
          "pct": 0.583
        },
        "quarterly_1": {
          "target": 12.0,
          "actual": 6.0,
          "pct": 0.5
        },
        "quarterly_2": {
          "target": 12.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 7.0,
          "actual": 0.5833
        },
        "weekly_7_6": {
          "actual": 12.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.0494
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.0518
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 1.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_6": {
          "actual": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        }
      }
    },
    "VM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM5-I01.03": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 13.67,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 16.0,
          "actual": 15.5,
          "pct": 0.9688
        },
        "monthly_4": {
          "target": 15.5,
          "actual": 15.5,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 15.5,
          "actual": 15.5,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 15.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 14.5
        },
        "monthly_9": {
          "actual": 14.0
        },
        "monthly_10": {
          "actual": 14.0
        },
        "monthly_11": {
          "actual": 13.0
        },
        "yearly_2026": {
          "target": 16.0,
          "actual": 15.83,
          "pct": 0.99
        },
        "quarterly_1": {
          "target": 15.33,
          "actual": 15.0,
          "pct": 0.978
        },
        "quarterly_2": {
          "target": 14.67,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 16.0
        },
        "weekly_1_6": {
          "target": 16.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_7_6": {
          "actual": 14.5,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM5-I02.01a": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 3.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 4.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 4.0
        },
        "monthly_9": {
          "actual": 3.0
        },
        "monthly_10": {
          "actual": 3.0
        },
        "monthly_11": {
          "actual": 3.0
        },
        "yearly_2026": {
          "target": 5.0,
          "actual": 5.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 4.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.15,
          "pct": 5.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.15
        },
        "weekly_7_6": {
          "actual": 4.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Thời gian sản xuất TB 1 video (AI)": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 3.53,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1.07,
          "actual": 1.15,
          "pct": 1.0769
        },
        "monthly_4": {
          "target": 1.07,
          "actual": 1.36,
          "pct": 1.2727
        },
        "monthly_5": {
          "target": 1.07,
          "actual": 1.5,
          "pct": 1.4
        },
        "monthly_6": {
          "target": 1.07,
          "actual": 1.5,
          "pct": 1.4
        },
        "monthly_7": {
          "target": 1.14,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 1.21
        },
        "monthly_9": {
          "actual": 1.21
        },
        "monthly_10": {
          "actual": 1.29
        },
        "monthly_11": {
          "actual": 1.29
        },
        "yearly_2026": {
          "target": 2.53,
          "actual": 3.23,
          "pct": 1.275
        },
        "quarterly_1": {
          "target": 3.21,
          "actual": 4.5,
          "pct": 1.4
        },
        "quarterly_2": {
          "target": 3.5,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.3,
          "pct": 0.53
        },
        "weekly_1_6": {
          "target": 0.71,
          "actual": 1.3393
        },
        "weekly_2_5": {
          "pct": 0.3
        },
        "weekly_7_6": {
          "actual": 1.14,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM5-I02.02a": {
      "title": "Hiệu suất sản xuất",
      "unit": "ND",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.36,
          "actual": 0.38,
          "pct": 1.0769
        },
        "monthly_4": {
          "target": 0.36,
          "actual": 0.45,
          "pct": 1.2727
        },
        "monthly_5": {
          "target": 0.36,
          "actual": 0.5,
          "pct": 1.4
        },
        "monthly_6": {
          "target": 0.36,
          "actual": 0.5,
          "pct": 1.4
        },
        "monthly_7": {
          "target": 0.36,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 0.36
        },
        "monthly_9": {
          "actual": 0.36
        },
        "monthly_10": {
          "actual": 0.36
        },
        "monthly_11": {
          "actual": 0.36
        },
        "yearly_2026": {
          "target": 0.87,
          "actual": 0.77,
          "pct": 0.888
        },
        "quarterly_1": {
          "target": 1.07,
          "actual": 1.5,
          "pct": 1.4
        },
        "quarterly_2": {
          "target": 1.07,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.15,
          "pct": 0.2
        },
        "weekly_1_6": {
          "target": 0.14,
          "actual": 0.7143
        },
        "weekly_2_5": {
          "pct": 0.15
        },
        "weekly_7_6": {
          "actual": 0.36,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 210862860.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 46634908.0,
          "actual": 37068614.0,
          "pct": 0.7949
        },
        "monthly_4": {
          "target": 50010794.0,
          "actual": 36225961.0,
          "pct": 0.7244
        },
        "monthly_5": {
          "target": 54422082.0,
          "actual": 27768617.0,
          "pct": 0.5102
        },
        "monthly_6": {
          "target": 56687453.0,
          "actual": 18589735.0,
          "pct": 0.3279
        },
        "monthly_7": {
          "target": 58327084.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 64991209.0
        },
        "monthly_9": {
          "actual": 66701272.0
        },
        "monthly_10": {
          "actual": 70831185.0
        },
        "monthly_11": {
          "actual": 73330403.0
        },
        "yearly_2026": {
          "target": 132684279.0,
          "actual": 130844172.0,
          "pct": 0.986
        },
        "quarterly_1": {
          "target": 161120330.0,
          "actual": 65880889.0,
          "pct": 0.409
        },
        "quarterly_2": {
          "target": 185826653.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 44377722.0
        },
        "weekly_1_6": {
          "target": 39314787.0,
          "actual": 0.8859
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_7_6": {
          "actual": 62508360.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Hiệu suất sản xuất (gồm video thường + AI)": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 1265177161.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 279809448.0,
          "actual": 129740148.0,
          "pct": 0.4637
        },
        "monthly_4": {
          "target": 300064765.0,
          "actual": 72451922.0,
          "pct": 0.2415
        },
        "monthly_5": {
          "target": 326532494.0,
          "actual": 69421543.0,
          "pct": 0.2126
        },
        "monthly_6": {
          "target": 340124720.0,
          "actual": 55769204.0,
          "pct": 0.164
        },
        "monthly_7": {
          "target": 349962503.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 389947253.0
        },
        "monthly_9": {
          "actual": 400207633.0
        },
        "monthly_10": {
          "actual": 424987112.0
        },
        "monthly_11": {
          "actual": 439982417.0
        },
        "yearly_2026": {
          "target": 796105675.0,
          "actual": 457954604.0,
          "pct": 0.575
        },
        "quarterly_1": {
          "target": 966721979.0,
          "actual": 197642668.0,
          "pct": 0.204
        },
        "quarterly_2": {
          "target": 1114959918.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 266266330.0
        },
        "weekly_1_6": {
          "target": 137601754.0,
          "actual": 0.5168
        },
        "weekly_7_6": {
          "actual": 375050163.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM5-I02.04a": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 506070864.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 111923779.0,
          "actual": 51896059.0,
          "pct": 0.4637
        },
        "monthly_4": {
          "target": 120025906.0,
          "actual": 28980769.0,
          "pct": 0.2415
        },
        "monthly_5": {
          "target": 130612997.0,
          "actual": 27768617.0,
          "pct": 0.2126
        },
        "monthly_6": {
          "target": 136049888.0,
          "actual": 22307681.0,
          "pct": 0.164
        },
        "monthly_7": {
          "target": 139985001.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 155978901.0
        },
        "monthly_9": {
          "actual": 160083053.0
        },
        "monthly_10": {
          "actual": 169994845.0
        },
        "monthly_11": {
          "actual": 175992967.0
        },
        "yearly_2026": {
          "target": 318442270.0,
          "actual": 183181841.0,
          "pct": 0.575
        },
        "quarterly_1": {
          "target": 386688791.0,
          "actual": 79057067.0,
          "pct": 0.204
        },
        "quarterly_2": {
          "target": 445983967.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 106506532.0
        },
        "weekly_1_6": {
          "target": 55040702.0,
          "actual": 0.5168
        },
        "weekly_7_6": {
          "actual": 150020065.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "Số vi phạm chính sách",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.05
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.05
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 90.0
        },
        "monthly_9": {
          "actual": 90.0
        },
        "monthly_10": {
          "actual": 90.0
        },
        "monthly_11": {
          "actual": 90.0
        },
        "yearly_2026": {
          "target": 0.9,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.9,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.5,
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.5
        },
        "weekly_7_6": {
          "actual": 90.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.1111
        },
        "monthly_6": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.1111
        },
        "monthly_8": {
          "actual": 90.0
        },
        "monthly_9": {
          "actual": 90.0
        },
        "monthly_10": {
          "actual": 90.0
        },
        "monthly_11": {
          "actual": 90.0
        },
        "yearly_2026": {
          "target": 0.9,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.9,
          "actual": 0.9,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.9,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.5,
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_2_5": {
          "pct": 0.5
        },
        "weekly_7_6": {
          "actual": 90.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 20.0
        },
        "monthly_9": {
          "actual": 20.0
        },
        "monthly_10": {
          "actual": 20.0
        },
        "monthly_11": {
          "actual": 20.0
        },
        "yearly_2026": {
          "target": 0.2,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.2,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_6": {
          "actual": 20.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM6-I04": {
      "title": "Số lượng nhân sự (ko tính quản lý BP/DA)",
      "unit": "Nhân sự",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 15.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 14.0,
          "actual": 13.0,
          "pct": 0.9286
        },
        "monthly_4": {
          "target": 14.0,
          "actual": 11.0,
          "pct": 0.7857
        },
        "monthly_5": {
          "target": 14.0,
          "actual": 10.0,
          "pct": 0.7143
        },
        "monthly_6": {
          "target": 14.0,
          "actual": 10.0,
          "pct": 0.7143
        },
        "monthly_7": {
          "target": 14.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 14.0
        },
        "monthly_9": {
          "actual": 14.0
        },
        "monthly_10": {
          "actual": 14.0
        },
        "monthly_11": {
          "actual": 14.0
        },
        "yearly_2026": {
          "target": 15.0,
          "actual": 13.0,
          "pct": 0.867
        },
        "quarterly_1": {
          "target": 14.0,
          "actual": 10.0,
          "pct": 0.714
        },
        "quarterly_2": {
          "target": 14.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 15.0
        },
        "weekly_1_6": {
          "target": 14.0,
          "actual": 0.9333
        },
        "weekly_7_6": {
          "actual": 14.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "pct": 0.04
        },
        "weekly_1_5": {
          "actual": 0.05
        },
        "weekly_1_6": {
          "actual": 0.04
        },
        "weekly_2_5": {
          "pct": 0.05
        }
      }
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.2,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 0.2,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 20.0
        },
        "monthly_9": {
          "actual": 20.0
        },
        "monthly_10": {
          "actual": 20.0
        },
        "monthly_11": {
          "actual": 20.0
        },
        "yearly_2026": {
          "target": 0.2,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.2,
          "actual": 0.2,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.2,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.2,
          "pct": 0.2
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_7_6": {
          "actual": 20.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "TM7-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.1,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 0.1,
          "pct": 0.0
        },
        "monthly_7": {
          "target": 10.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 10.0
        },
        "monthly_9": {
          "actual": 10.0
        },
        "monthly_10": {
          "actual": 10.0
        },
        "monthly_11": {
          "actual": 10.0
        },
        "yearly_2026": {
          "target": 0.1,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.1,
          "actual": 0.1,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.1,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.1
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_6": {
          "actual": 10.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 0.0
        },
        "monthly_5": {
          "target": 0.0
        },
        "monthly_6": {
          "target": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "monthly_8": {
          "actual": 0.0
        },
        "monthly_9": {
          "actual": 0.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_7_6": {
          "actual": 0.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.95,
          "actual": 0.94,
          "pct": 0.9907
        },
        "monthly_4": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.9,
          "actual": 1.0,
          "pct": 1.1111
        },
        "monthly_7": {
          "target": 0.9,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 90.0
        },
        "monthly_9": {
          "actual": 90.0
        },
        "monthly_10": {
          "actual": 90.0
        },
        "monthly_11": {
          "actual": 90.0
        },
        "yearly_2026": {
          "target": 0.9,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 0.9,
          "actual": 0.97,
          "pct": 1.078
        },
        "quarterly_2": {
          "target": 0.9,
          "pct": 0.0
        },
        "weekly_1_5": {
          "actual": 0.8,
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.94,
          "actual": 0.9907
        },
        "weekly_2_5": {
          "pct": 0.8
        },
        "weekly_7_6": {
          "actual": 90.0,
          "target": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        },
        "weekly_10_6": {
          "target": 0.0
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 6.0,
          "pct": 0.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 2.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 1.0,
          "pct": 0.0
        },
        "monthly_8": {
          "actual": 1.0
        },
        "monthly_9": {
          "actual": 1.0
        },
        "monthly_10": {
          "actual": 0.0
        },
        "monthly_11": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 2.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 6.0,
          "actual": 0.0
        },
        "weekly_7_6": {
          "actual": 0.0
        },
        "weekly_8_6": {
          "target": 0.0
        },
        "weekly_9_6": {
          "target": 0.0
        }
      }
    }
  },
  "Music": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "target": 0.0423,
          "actual": -0.43
        },
        "quarterly_1": {
          "target": 0.356,
          "actual": -0.182
        },
        "quarterly_2": {
          "target": 1.19
        }
      }
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {
        "yearly_2026": {
          "target": 0.0406,
          "actual": -0.75
        },
        "quarterly_1": {
          "target": 0.224,
          "actual": -0.315
        },
        "quarterly_2": {
          "target": 0.54
        }
      }
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.642,
          "actual": 124971992.0,
          "pct": 40332997.0
        },
        "monthly_3": {
          "target": 425221540.0,
          "actual": 172164977.0,
          "pct": 0.4049
        },
        "monthly_4": {
          "target": 427666624.0,
          "actual": 191170176.0,
          "pct": 0.45
        },
        "monthly_5": {
          "target": 427375104.0,
          "actual": 156121252.0,
          "pct": 0.37
        },
        "monthly_6": {
          "target": 715496175.0,
          "actual": 251421143.0,
          "pct": 0.35
        },
        "monthly_7": {
          "target": 332709700.0,
          "pct": 0.0
        },
        "yearly_2026": {
          "target": 936940090.0,
          "actual": 489812514.0,
          "pct": 0.52
        },
        "quarterly_1": {
          "target": 1570537903.0,
          "actual": 598712571.0,
          "pct": 0.38
        },
        "quarterly_2": {
          "target": 1000509576.0
        },
        "weekly_1_1": {
          "target": 40000000.0,
          "actual": 22581001.0,
          "pct": 0.5645
        },
        "weekly_1_2": {
          "target": 40000000.0,
          "actual": 37561194.0,
          "pct": 0.939
        },
        "weekly_1_4": {
          "target": 0.3227
        },
        "weekly_1_5": {
          "pct": 294504510.0
        },
        "weekly_1_6": {
          "target": 153037866.0,
          "actual": 0.5196,
          "pct": 40000000.0
        },
        "weekly_2_1": {
          "target": 35887544.0,
          "actual": 0.9,
          "pct": 50000000.0
        },
        "weekly_2_2": {
          "target": 37890464.0,
          "actual": 0.76,
          "pct": 50000000.0
        },
        "weekly_2_3": {
          "target": 32686559.0,
          "actual": 0.65,
          "pct": 188039943.0
        },
        "weekly_2_4": {
          "target": 31465912.0,
          "actual": 0.17
        },
        "weekly_3_1": {
          "target": 50000000.0,
          "actual": 50073219.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 80000000.0,
          "actual": 38610312.0,
          "pct": 0.48
        },
        "weekly_3_3": {
          "target": 80000000.0,
          "actual": 32375203.0,
          "pct": 0.4
        },
        "weekly_3_4": {
          "target": 304162806.0,
          "actual": 44517649.0,
          "pct": 0.15
        },
        "weekly_4_1": {
          "target": 50000000.0,
          "actual": 17738759.0,
          "pct": 0.35
        },
        "weekly_4_2": {
          "target": 50000000.0,
          "actual": 31355893.0,
          "pct": 0.63
        },
        "weekly_4_3": {
          "target": 100000000.0,
          "actual": 57403189.0,
          "pct": 0.57
        },
        "weekly_4_4": {
          "target": 100000000.0,
          "actual": 47649973.0,
          "pct": 0.48
        },
        "weekly_4_5": {
          "target": 273518810.0
        },
        "weekly_5_1": {
          "target": 50000000.0,
          "actual": 25758061.0,
          "pct": 0.52
        },
        "weekly_5_2": {
          "target": 80000000.0,
          "actual": 29351589.0,
          "pct": 0.37
        },
        "weekly_5_3": {
          "target": 80000000.0,
          "actual": 51531825.0,
          "pct": 0.64
        },
        "weekly_5_4": {
          "target": 320733629.0,
          "actual": 34751127.0,
          "pct": 0.11
        },
        "weekly_6_1": {
          "target": 50000000.0,
          "actual": 25900478.0,
          "pct": 0.52
        },
        "weekly_6_2": {
          "target": 80000000.0,
          "actual": 95561545.0,
          "pct": 1.19
        },
        "weekly_6_3": {
          "target": 80000000.0,
          "actual": 51118403.0,
          "pct": 0.64
        },
        "weekly_6_4": {
          "target": 542915749.0,
          "actual": 48726897.0,
          "pct": 0.09
        },
        "weekly_7_1": {
          "target": 50000000.0,
          "actual": 42726270.0,
          "pct": 0.85
        },
        "weekly_7_2": {
          "target": 60000000.0,
          "actual": 28339376.0,
          "pct": 0.47
        },
        "weekly_7_3": {
          "target": 100000000.0,
          "actual": 107491845.0,
          "pct": 1.07
        },
        "weekly_7_4": {
          "target": 60000000.0
        }
      }
    },
    "VM1-I02.02": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_6": {
          "target": 357748087.5,
          "actual": 73265876.0,
          "pct": 0.7027882239
        },
        "monthly_7": {
          "target": 133083880.0
        }
      }
    },
    "VM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.7677,
          "pct": 0.77
        },
        "quarterly_1": {
          "target": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí mua công cụ AI phân bổ hàng tháng",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 0.8179
        },
        "quarterly_1": {
          "pct": 0.8117
        }
      }
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "MM1-I03.01": {
      "title": "Số lượng sản phẩm âm nhạc hoàn thành sản xuất",
      "unit": "sản phẩm",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 155.0,
          "pct": 129.0
        },
        "monthly_3": {
          "target": 920.0,
          "actual": 957.0,
          "pct": 1.0402
        },
        "monthly_4": {
          "target": 811.0,
          "actual": 799.0,
          "pct": 0.99
        },
        "monthly_5": {
          "target": 917.0,
          "actual": 949.0,
          "pct": 1.03
        },
        "monthly_6": {
          "target": 816.0,
          "actual": 650.0,
          "pct": 0.8
        },
        "monthly_7": {
          "target": 474.0,
          "actual": 262.0,
          "pct": 0.55
        },
        "yearly_2026": {
          "target": 1727.0,
          "actual": 2098.0,
          "pct": 1.21
        },
        "quarterly_1": {
          "target": 2329.0,
          "actual": 2398.0,
          "pct": 1.0296
        },
        "quarterly_2": {
          "target": 1842.0
        },
        "weekly_1_1": {
          "target": 230.0,
          "actual": 251.0,
          "pct": 1.091304348
        },
        "weekly_1_2": {
          "target": 200.0,
          "actual": 194.0
        },
        "weekly_1_5": {
          "pct": 321.0
        },
        "weekly_1_6": {
          "target": 351.0,
          "actual": 1.0935,
          "pct": 55.0
        },
        "weekly_2_1": {
          "target": 46.0,
          "pct": 114.0
        },
        "weekly_2_2": {
          "target": 84.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 179.0
        },
        "weekly_2_4": {
          "target": 221.0
        },
        "weekly_3_1": {
          "target": 192.0,
          "actual": 178.0,
          "pct": 0.9271
        },
        "weekly_3_2": {
          "target": 228.0,
          "actual": 212.0,
          "pct": 0.9298
        },
        "weekly_3_3": {
          "target": 230.0,
          "actual": 210.0
        },
        "weekly_3_4": {
          "target": 352.0,
          "actual": 352.0
        },
        "weekly_4_1": {
          "target": 241.0,
          "actual": 272.0
        },
        "weekly_4_2": {
          "target": 206.0,
          "actual": 124.0
        },
        "weekly_4_3": {
          "target": 183.0,
          "actual": 175.0
        },
        "weekly_4_4": {
          "target": 126.0,
          "actual": 220.0
        },
        "weekly_4_5": {
          "target": 7.0,
          "actual": 10.0
        },
        "weekly_5_1": {
          "target": 214.0,
          "actual": 197.0
        },
        "weekly_5_2": {
          "target": 214.0,
          "actual": 213.0
        },
        "weekly_5_3": {
          "target": 246.0,
          "actual": 157.0
        },
        "weekly_5_4": {
          "target": 327.0,
          "actual": 382.0
        },
        "weekly_6_1": {
          "target": 207.0,
          "actual": 243.0
        },
        "weekly_6_2": {
          "target": 198.0,
          "actual": 190.0
        },
        "weekly_6_3": {
          "target": 168.0,
          "actual": 157.0
        },
        "weekly_6_4": {
          "target": 198.0,
          "actual": 45.0
        },
        "weekly_7_1": {
          "target": 84.0,
          "actual": 84.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 108.0,
          "actual": 117.0,
          "pct": 1.08
        },
        "weekly_7_3": {
          "target": 64.0,
          "actual": 75.0
        },
        "weekly_7_4": {
          "target": 68.0,
          "actual": 1.0
        }
      }
    },
    "Số lượng sản phẩm hoàn thành sản xuất": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 10.0
        },
        "monthly_3": {
          "target": 10.0,
          "actual": 15.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 45.0,
          "actual": 45.0
        },
        "quarterly_1": {
          "target": 45.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 15.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 10.0
        },
        "weekly_1_5": {
          "pct": 10.0
        },
        "weekly_1_6": {
          "target": 10.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 10.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 10.0,
          "actual": 10.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 5.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Số lượng NDSX Kid Songs": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 2.0,
          "actual": 2.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Số lượng NDSX Original Song Việt Nam": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 1.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 4.0,
          "actual": 5.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 6.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 4.0
        },
        "monthly_6": {
          "target": 5.0,
          "actual": 5.0
        },
        "monthly_7": {
          "target": 5.0,
          "actual": 4.0
        },
        "yearly_2026": {
          "target": 12.0,
          "actual": 12.0
        },
        "quarterly_1": {
          "target": 12.0,
          "actual": 15.0
        },
        "quarterly_2": {
          "target": 12.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 2.0,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_3": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_4": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "Số lượng NDSX Cover hit": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 7.0,
          "pct": 7.0
        },
        "monthly_3": {
          "target": 52.0,
          "actual": 51.0
        },
        "monthly_4": {
          "target": 13.0,
          "actual": 6.0
        },
        "monthly_5": {
          "target": 10.0,
          "actual": 14.0
        },
        "monthly_6": {
          "target": 3.0,
          "actual": 3.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 144.0,
          "actual": 115.0
        },
        "quarterly_1": {
          "target": 144.0,
          "actual": 23.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_1_2": {
          "target": 7.0,
          "actual": 6.0
        },
        "weekly_1_5": {
          "pct": 34.0
        },
        "weekly_1_6": {
          "target": 34.0,
          "pct": 18.0
        },
        "weekly_2_1": {
          "target": 18.0,
          "pct": 10.0
        },
        "weekly_2_2": {
          "target": 9.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 6.0
        },
        "weekly_2_4": {
          "target": 7.0
        },
        "weekly_3_1": {
          "target": 11.0,
          "actual": 11.0
        },
        "weekly_3_2": {
          "target": 10.0,
          "actual": 16.0
        },
        "weekly_3_3": {
          "target": 10.0,
          "actual": 11.0
        },
        "weekly_3_4": {
          "target": 9.0,
          "actual": 8.0
        },
        "weekly_4_1": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_5_4": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_6_1": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Số lượng NDSX nhạc không lời": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 21.0,
          "actual": 21.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 8.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 1.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 60.0,
          "actual": 41.0
        },
        "quarterly_1": {
          "target": 60.0,
          "actual": 9.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 20.0
        },
        "weekly_1_6": {
          "target": 20.0,
          "pct": 13.0
        },
        "weekly_2_1": {
          "target": 13.0,
          "pct": 7.0
        },
        "weekly_2_2": {
          "target": 7.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 5.0,
          "actual": 16.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 2.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_4": {
          "target": 4.0,
          "actual": 4.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "-2 bài sản xuất 30,31/3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 7.0,
          "pct": 7.0
        },
        "monthly_3": {
          "target": 31.0,
          "actual": 30.0
        },
        "monthly_4": {
          "target": 9.0,
          "actual": 6.0
        },
        "monthly_5": {
          "target": 6.0,
          "actual": 6.0
        },
        "monthly_6": {
          "target": 2.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 24.0,
          "actual": 74.0
        },
        "quarterly_1": {
          "target": 24.0,
          "actual": 14.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_1_2": {
          "target": 7.0,
          "actual": 6.0
        },
        "weekly_1_5": {
          "pct": 14.0
        },
        "weekly_1_6": {
          "target": 14.0,
          "pct": 5.0
        },
        "weekly_2_1": {
          "target": 5.0,
          "pct": 3.0
        },
        "weekly_2_2": {
          "target": 2.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 6.0
        },
        "weekly_2_4": {
          "target": 7.0
        },
        "weekly_3_1": {
          "target": 11.0,
          "actual": 11.0
        },
        "weekly_3_2": {
          "target": 5.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 10.0,
          "actual": 9.0
        },
        "weekly_3_4": {
          "target": 8.0,
          "actual": 7.0
        },
        "weekly_4_1": {
          "target": 6.0,
          "actual": 6.0
        },
        "weekly_4_2": {
          "target": 3.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "Số lượng NDSX Jazz Relaxing": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 60.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 60.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "Số lượng NDSX Meditation Relaxing": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "Số lượng NDSX Worship": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Theme songs": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_3": {
          "target": 4.0,
          "actual": 8.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 6.0
        },
        "monthly_5": {
          "target": 8.0,
          "actual": 8.0
        },
        "monthly_6": {
          "target": 8.0,
          "actual": 8.0
        },
        "monthly_7": {
          "target": 4.0,
          "actual": 8.0
        },
        "yearly_2026": {
          "target": 24.0,
          "actual": 34.0
        },
        "quarterly_1": {
          "target": 26.0,
          "actual": 22.0
        },
        "quarterly_2": {
          "target": 28.0
        },
        "weekly_1_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_1_5": {
          "pct": 24.0
        },
        "weekly_1_6": {
          "target": 18.0,
          "pct": 6.0
        },
        "weekly_2_1": {
          "target": 8.0,
          "pct": 8.0
        },
        "weekly_2_2": {
          "target": 8.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 8.0
        },
        "weekly_2_4": {
          "target": 2.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_3_3": {
          "target": 8.0,
          "actual": 4.0
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_3": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_7_1": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_4": {
          "target": 2.0,
          "actual": 0.0
        }
      }
    },
    "Sáng tác bài hát": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_3": {
          "target": 2.0,
          "actual": 4.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 3.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 4.0
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 4.0
        },
        "monthly_7": {
          "target": 2.0,
          "actual": 3.0
        },
        "yearly_2026": {
          "target": 12.0,
          "actual": 17.0
        },
        "quarterly_1": {
          "target": 13.0,
          "actual": 11.0
        },
        "quarterly_2": {
          "target": 14.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 1.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_3": {
          "target": 4.0,
          "actual": 2.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "Sáng tác melody": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_3": {
          "target": 2.0,
          "actual": 4.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 3.0
        },
        "monthly_5": {
          "target": 4.0,
          "actual": 4.0
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 4.0
        },
        "monthly_7": {
          "target": 2.0,
          "actual": 5.0
        },
        "yearly_2026": {
          "target": 12.0,
          "actual": 17.0
        },
        "quarterly_1": {
          "target": 13.0,
          "actual": 11.0
        },
        "quarterly_2": {
          "target": 14.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_5": {
          "pct": 12.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 4.0
        },
        "weekly_2_4": {
          "target": 1.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_3": {
          "target": 4.0,
          "actual": 2.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 5.0,
          "actual": 5.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "Sáng tác lyric": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 16.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 55.0,
          "actual": 52.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 16.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 3.0
        },
        "weekly_4_4": {
          "target": 5.0,
          "actual": 8.0
        },
        "weekly_4_5": {
          "target": 5.0,
          "actual": 5.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 31.0,
          "actual": 31.0
        },
        "weekly_7_2": {
          "target": 22.0,
          "actual": 21.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "Hoàn thành 9 bài Kid Songs Remix, 13 bài Relaxing Piano": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 145.0,
          "pct": 110.0
        },
        "monthly_3": {
          "target": 850.0,
          "actual": 878.0
        },
        "monthly_4": {
          "target": 790.0,
          "actual": 765.0
        },
        "monthly_5": {
          "target": 895.0,
          "actual": 923.0
        },
        "monthly_6": {
          "target": 800.0,
          "actual": 634.0
        },
        "monthly_7": {
          "target": 410.0,
          "actual": 198.0
        },
        "yearly_2026": {
          "target": 1500.0,
          "actual": 1890.0
        },
        "quarterly_1": {
          "target": 2100.0,
          "actual": 2322.0
        },
        "quarterly_2": {
          "target": 1800.0
        },
        "weekly_1_1": {
          "target": 205.0,
          "actual": 239.0
        },
        "weekly_1_2": {
          "target": 190.0,
          "actual": 174.0
        },
        "weekly_1_5": {
          "pct": 250.0
        },
        "weekly_1_6": {
          "target": 287.0,
          "pct": 30.0
        },
        "weekly_2_1": {
          "target": 20.0,
          "pct": 95.0
        },
        "weekly_2_2": {
          "target": 65.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 160.0
        },
        "weekly_2_4": {
          "target": 202.0
        },
        "weekly_3_1": {
          "target": 180.0,
          "actual": 166.0
        },
        "weekly_3_2": {
          "target": 215.0,
          "actual": 193.0
        },
        "weekly_3_3": {
          "target": 200.0,
          "actual": 183.0
        },
        "weekly_3_4": {
          "target": 340.0,
          "actual": 336.0
        },
        "weekly_4_1": {
          "target": 230.0,
          "actual": 261.0
        },
        "weekly_4_2": {
          "target": 200.0,
          "actual": 121.0
        },
        "weekly_4_3": {
          "target": 180.0,
          "actual": 170.0
        },
        "weekly_4_4": {
          "target": 120.0,
          "actual": 210.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 3.0
        },
        "weekly_5_1": {
          "target": 209.0,
          "actual": 193.0
        },
        "weekly_5_2": {
          "target": 209.0,
          "actual": 208.0
        },
        "weekly_5_3": {
          "target": 240.0,
          "actual": 151.0
        },
        "weekly_5_4": {
          "target": 316.0,
          "actual": 371.0
        },
        "weekly_6_1": {
          "target": 200.0,
          "actual": 236.0
        },
        "weekly_6_2": {
          "target": 195.0,
          "actual": 187.0
        },
        "weekly_6_3": {
          "target": 165.0,
          "actual": 154.0
        },
        "weekly_6_4": {
          "target": 195.0,
          "actual": 42.0
        },
        "weekly_7_1": {
          "target": 50.0,
          "actual": 52.0
        },
        "weekly_7_2": {
          "target": 85.0,
          "actual": 95.0
        },
        "weekly_7_3": {
          "target": 55.0,
          "actual": 66.0
        },
        "weekly_7_4": {
          "target": 65.0
        }
      }
    },
    "MM2-I01.02": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Số lượng sản phẩm video public",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 60.0,
          "pct": 55.0
        },
        "monthly_3": {
          "target": 220.0,
          "actual": 202.0
        },
        "monthly_4": {
          "target": 240.0,
          "actual": 362.0,
          "pct": 1.3
        },
        "monthly_5": {
          "target": 381.0,
          "actual": 313.0,
          "pct": 0.82
        },
        "monthly_6": {
          "target": 270.0,
          "actual": 277.0
        },
        "monthly_7": {
          "target": 350.0,
          "actual": 273.0
        },
        "yearly_2026": {
          "target": 720.0,
          "actual": 652.0,
          "pct": 0.91
        },
        "quarterly_1": {
          "target": 720.0,
          "actual": 952.0,
          "pct": 1.3222
        },
        "quarterly_2": {
          "target": 660.0
        },
        "weekly_1_1": {
          "target": 60.0,
          "actual": 63.0
        },
        "weekly_1_2": {
          "target": 60.0,
          "actual": 48.0
        },
        "weekly_1_5": {
          "pct": 200.0
        },
        "weekly_1_6": {
          "target": 230.0,
          "pct": 50.0
        },
        "weekly_2_1": {
          "target": 55.0,
          "pct": 50.0
        },
        "weekly_2_2": {
          "target": 62.0,
          "pct": 50.0
        },
        "weekly_2_3": {
          "target": 56.0,
          "pct": 50.0
        },
        "weekly_2_4": {
          "target": 57.0
        },
        "weekly_3_1": {
          "target": 55.0,
          "actual": 55.0
        },
        "weekly_3_2": {
          "target": 55.0,
          "actual": 38.0
        },
        "weekly_3_3": {
          "target": 55.0,
          "actual": 49.0
        },
        "weekly_3_4": {
          "target": 55.0,
          "actual": 60.0
        },
        "weekly_4_1": {
          "target": 67.0,
          "actual": 76.0
        },
        "weekly_4_2": {
          "target": 75.0,
          "actual": 71.0
        },
        "weekly_4_3": {
          "target": 88.0,
          "actual": 77.0
        },
        "weekly_4_4": {
          "target": 80.0,
          "actual": 85.0
        },
        "weekly_4_5": {
          "target": 80.0
        },
        "weekly_5_1": {
          "target": 88.0,
          "actual": 85.0
        },
        "weekly_5_2": {
          "target": 90.0,
          "actual": 87.0
        },
        "weekly_5_3": {
          "target": 83.0,
          "actual": 80.0
        },
        "weekly_5_4": {
          "target": 60.0,
          "actual": 62.0
        },
        "weekly_6_1": {
          "target": 63.0,
          "actual": 62.0
        },
        "weekly_6_2": {
          "target": 56.0,
          "actual": 59.0
        },
        "weekly_6_3": {
          "target": 56.0,
          "actual": 49.0
        },
        "weekly_6_4": {
          "target": 68.0,
          "actual": 87.0
        },
        "weekly_7_1": {
          "target": 88.0,
          "actual": 93.0
        },
        "weekly_7_2": {
          "target": 88.0,
          "actual": 89.0
        },
        "weekly_7_3": {
          "target": 88.0,
          "actual": 91.0
        },
        "weekly_7_4": {
          "target": 88.0
        }
      }
    },
    "MM2-I02": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Nâng cao chất lượng video upload trên kênh thương hiệu",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 4.0,
          "actual": 1.0
        },
        "monthly_4": {
          "target": 4.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 1.0,
          "pct": 0.14
        },
        "monthly_6": {
          "target": 4.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 4.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 12.0,
          "actual": 4.0,
          "pct": 0.33
        },
        "quarterly_1": {
          "target": 12.0,
          "actual": 1.0,
          "pct": 0.0833
        },
        "quarterly_2": {
          "target": 12.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 4.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 1.0
        },
        "weekly_5_1": {
          "target": 3.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 2.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 2.0
        },
        "weekly_10_6": {
          "actual": 0.2,
          "pct": 6.0
        },
        "weekly_11_1": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 1.0
        },
        "weekly_11_2": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_11_3": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_11_4": {
          "target": 0.0,
          "pct": 1.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 0.8707
        },
        "quarterly_1": {
          "pct": 1.063
        }
      }
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Số lượng video vượt mốc traffic đề ra theo từng thời điểm ( mốc 20k views)": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube DA01",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.67,
          "actual": 3451068.0,
          "pct": 1334820.0
        },
        "monthly_3": {
          "target": 8005000.0,
          "actual": 5710166.0,
          "pct": 0.71
        },
        "monthly_4": {
          "target": 8005000.0,
          "actual": 5704067.0,
          "pct": 0.71
        },
        "monthly_5": {
          "target": 8232000.0,
          "actual": 5184974.0,
          "pct": 0.63
        },
        "monthly_6": {
          "target": 6875000.0,
          "actual": 4890532.0
        },
        "monthly_7": {
          "target": 5500000.0
        },
        "yearly_2026": {
          "target": 22692000.0,
          "actual": 15942315.0,
          "pct": 0.7026
        },
        "quarterly_1": {
          "target": 24722000.0,
          "actual": 15779573.0,
          "pct": 0.6383
        },
        "quarterly_2": {
          "target": 20000000.0
        },
        "weekly_1_1": {
          "target": 1500000.0,
          "actual": 1273111.0,
          "pct": 0.85
        },
        "weekly_1_2": {
          "target": 1500000.0,
          "actual": 1271504.0,
          "pct": 0.85
        },
        "weekly_1_5": {
          "pct": 7827000.0
        },
        "weekly_1_6": {
          "target": 4469984.0,
          "actual": 0.5711,
          "pct": 1956750.0
        },
        "weekly_2_1": {
          "target": 1232177.0,
          "actual": 0.6297,
          "pct": 1500000.0
        },
        "weekly_2_2": {
          "target": 1166818.0,
          "actual": 0.7779,
          "pct": 1500000.0
        },
        "weekly_2_3": {
          "target": 906247.0,
          "actual": 0.6042,
          "pct": 4521758.0
        },
        "weekly_2_4": {
          "target": 1006599.0,
          "actual": 0.2226
        },
        "weekly_3_1": {
          "target": 2001250.0,
          "actual": 1244633.0,
          "pct": 0.6219
        },
        "weekly_3_2": {
          "target": 1500000.0,
          "actual": 1245804.0,
          "pct": 0.8305
        },
        "weekly_3_3": {
          "target": 1500000.0,
          "actual": 1269811.0,
          "pct": 0.8465
        },
        "weekly_3_4": {
          "target": 4244752.0,
          "actual": 1344280.0,
          "pct": 0.3167
        },
        "weekly_4_1": {
          "target": 1500000.0,
          "actual": 1299217.0,
          "pct": 0.87
        },
        "weekly_4_2": {
          "target": 1500000.0,
          "actual": 1378516.0,
          "pct": 0.92
        },
        "weekly_4_3": {
          "target": 1500000.0,
          "actual": 1271019.0,
          "pct": 0.85
        },
        "weekly_4_4": {
          "target": 1500000.0,
          "actual": 1390465.0,
          "pct": 0.93
        },
        "weekly_4_5": {
          "target": 2665783.0,
          "actual": 1243857.0,
          "pct": 0.47
        },
        "weekly_5_1": {
          "target": 1500000.0,
          "actual": 1192213.0,
          "pct": 0.79
        },
        "weekly_5_2": {
          "target": 1800000.0,
          "actual": 1106842.0,
          "pct": 0.61
        },
        "weekly_5_3": {
          "target": 1500000.0,
          "actual": 1122559.0,
          "pct": 0.75
        },
        "weekly_5_4": {
          "target": 4810386.0
        },
        "weekly_6_1": {
          "target": 1200000.0,
          "actual": 1194279.0,
          "pct": 1.0
        },
        "weekly_6_2": {
          "target": 1200000.0,
          "actual": 1169444.0,
          "pct": 0.97
        },
        "weekly_6_3": {
          "target": 1200000.0,
          "actual": 1087776.0,
          "pct": 0.91
        },
        "weekly_6_4": {
          "target": 3423501.0,
          "actual": 1093908.0,
          "pct": 0.32
        },
        "weekly_7_1": {
          "target": 1200000.0,
          "actual": 1247720.0,
          "pct": 1.0398
        },
        "weekly_7_2": {
          "target": 1500000.0,
          "actual": 1220715.0,
          "pct": 0.81
        },
        "weekly_7_3": {
          "target": 1500000.0,
          "actual": 1271391.0,
          "pct": 0.85
        },
        "weekly_7_4": {
          "target": 1500000.0
        }
      }
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "TM3-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 1.0389
        },
        "quarterly_1": {
          "pct": 1.49
        }
      }
    },
    "MM3-I02.03": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Đối tác",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 14.0,
          "pct": 15.0
        },
        "monthly_3": {
          "target": 50.0,
          "actual": 50.0
        },
        "monthly_4": {
          "target": 30.0,
          "actual": 30.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 30.0,
          "actual": 30.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 30.0,
          "actual": 30.0
        },
        "monthly_7": {
          "target": 30.0
        },
        "yearly_2026": {
          "target": 150.0,
          "actual": 161.0,
          "pct": 1.0733
        },
        "quarterly_1": {
          "target": 120.0,
          "actual": 90.0,
          "pct": 0.75
        },
        "quarterly_2": {
          "target": 90.0
        },
        "weekly_1_1": {
          "target": 14.0,
          "actual": 13.0
        },
        "weekly_1_2": {
          "target": 14.0,
          "actual": 9.0
        },
        "weekly_1_5": {
          "pct": 40.0
        },
        "weekly_1_6": {
          "target": 50.0,
          "actual": 1.25,
          "pct": 12.0
        },
        "weekly_2_1": {
          "target": 12.0,
          "pct": 14.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 25.0
        },
        "weekly_2_4": {
          "target": 35.0
        },
        "weekly_3_1": {
          "target": 12.0,
          "actual": 12.0
        },
        "weekly_3_2": {
          "target": 12.0,
          "actual": 9.0
        },
        "weekly_3_3": {
          "target": 14.0,
          "actual": 20.0
        },
        "weekly_3_4": {
          "target": 9.0,
          "actual": 9.0
        },
        "weekly_4_1": {
          "target": 10.0,
          "actual": 2.0
        },
        "weekly_4_2": {
          "target": 10.0,
          "actual": 9.0
        },
        "weekly_4_3": {
          "target": 8.0,
          "actual": 10.0
        },
        "weekly_4_4": {
          "target": 9.0,
          "actual": 9.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 8.0,
          "actual": 2.0
        },
        "weekly_5_2": {
          "target": 12.0,
          "actual": 5.0
        },
        "weekly_5_3": {
          "target": 12.0,
          "actual": 5.0
        },
        "weekly_5_4": {
          "target": 18.0
        },
        "weekly_6_1": {
          "target": 8.0,
          "actual": 9.0
        },
        "weekly_6_2": {
          "target": 8.0,
          "actual": 7.0
        },
        "weekly_6_3": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_6_4": {
          "target": 7.0,
          "actual": 7.0
        },
        "weekly_7_1": {
          "target": 5.0,
          "actual": 2.0
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 6.0,
          "actual": 6.0
        },
        "weekly_7_4": {
          "target": 7.0
        }
      }
    },
    "MM3-I02.04": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số lượng đối tác SCMU phản hồi",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 30.0,
          "pct": 22.0
        },
        "monthly_3": {
          "target": 150.0,
          "actual": 154.0
        },
        "monthly_4": {
          "target": 130.0,
          "actual": 147.0,
          "pct": 1.13
        },
        "monthly_5": {
          "target": 140.0,
          "actual": 154.0,
          "pct": 1.1
        },
        "monthly_6": {
          "target": 120.0,
          "actual": 121.0
        },
        "monthly_7": {
          "target": 130.0
        },
        "yearly_2026": {
          "target": 420.0,
          "actual": 510.0,
          "pct": 1.2143
        },
        "quarterly_1": {
          "target": 450.0,
          "actual": 422.0,
          "pct": 0.94
        },
        "quarterly_2": {
          "target": 450.0
        },
        "weekly_1_1": {
          "target": 35.0,
          "actual": 42.0
        },
        "weekly_1_2": {
          "target": 40.0,
          "actual": 61.0
        },
        "weekly_1_5": {
          "pct": 129.0
        },
        "weekly_1_6": {
          "target": 164.0,
          "actual": 1.2713,
          "pct": 35.0
        },
        "weekly_2_1": {
          "target": 27.0,
          "pct": 40.0
        },
        "weekly_2_2": {
          "target": 44.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 52.0
        },
        "weekly_2_4": {
          "target": 93.0
        },
        "weekly_3_1": {
          "target": 40.0,
          "actual": 39.0
        },
        "weekly_3_2": {
          "target": 40.0,
          "actual": 42.0
        },
        "weekly_3_3": {
          "target": 40.0,
          "actual": 43.0
        },
        "weekly_3_4": {
          "target": 28.0,
          "actual": 22.0
        },
        "weekly_4_1": {
          "target": 25.0,
          "actual": 7.0
        },
        "weekly_4_2": {
          "target": 30.0,
          "actual": 39.0
        },
        "weekly_4_3": {
          "target": 35.0,
          "actual": 41.0
        },
        "weekly_4_4": {
          "target": 40.0,
          "actual": 37.0
        },
        "weekly_4_5": {
          "target": 20.0,
          "actual": 12.0
        },
        "weekly_5_1": {
          "target": 35.0,
          "actual": 7.0
        },
        "weekly_5_2": {
          "target": 40.0,
          "actual": 42.0
        },
        "weekly_5_3": {
          "target": 45.0,
          "actual": 50.0
        },
        "weekly_5_4": {
          "target": 41.0
        },
        "weekly_6_1": {
          "target": 20.0,
          "actual": 11.0
        },
        "weekly_6_2": {
          "target": 25.0,
          "actual": 34.0
        },
        "weekly_6_3": {
          "target": 35.0,
          "actual": 38.0
        },
        "weekly_6_4": {
          "target": 37.0,
          "actual": 38.0
        },
        "weekly_7_1": {
          "target": 20.0,
          "actual": 20.0
        },
        "weekly_7_2": {
          "target": 28.0,
          "actual": 22.0,
          "pct": 0.79
        },
        "weekly_7_3": {
          "target": 30.0,
          "actual": 33.0
        },
        "weekly_7_4": {
          "target": 35.0
        }
      }
    },
    "MM3-I02.05": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "MM3-I02.05",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 2.0,
          "pct": 2.0
        },
        "monthly_3": {
          "target": 10.0,
          "actual": 12.0
        },
        "monthly_4": {
          "target": 7.0,
          "actual": 8.0,
          "pct": 1.14
        },
        "monthly_5": {
          "target": 7.0,
          "actual": 9.0,
          "pct": 1.29
        },
        "monthly_6": {
          "target": 7.0,
          "actual": 9.0
        },
        "monthly_7": {
          "target": 9.0
        },
        "yearly_2026": {
          "target": 25.0,
          "actual": 29.0,
          "pct": 1.16
        },
        "quarterly_1": {
          "target": 24.0,
          "actual": 26.0,
          "pct": 1.08
        },
        "quarterly_2": {
          "target": 28.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_1_5": {
          "pct": 7.0
        },
        "weekly_1_6": {
          "target": 9.0,
          "actual": 1.2857,
          "pct": 2.0
        },
        "weekly_2_1": {
          "target": 2.0,
          "pct": 2.0
        },
        "weekly_2_2": {
          "target": 3.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "target": 4.0
        },
        "weekly_3_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_3_2": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_3_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 3.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 1.0
        },
        "weekly_4_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_3": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_4": {
          "target": 2.0,
          "actual": 3.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_5_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 3.0
        },
        "weekly_5_4": {
          "target": 1.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_2": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 3.0
        },
        "weekly_6_4": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_7_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 2.0,
          "actual": 3.0
        },
        "weekly_7_4": {
          "target": 2.0
        }
      }
    },
    "MM3-I02.06": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số lượng đối tác SCMU chốt deal phối hợp nội bộ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        }
      }
    },
    "MM3-I02.07": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số lượng đối tác SCMU chốt deal dịch vụ sản xuất",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 4.0,
          "pct": 2.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 1.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "MM3-I02.08": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số lượng đối tác SCMU chốt deal cấp kênh + kho nhạc",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 2.0,
          "actual": 5.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 4.0,
          "pct": 2.0
        },
        "monthly_5": {
          "target": 2.0,
          "actual": 14.0,
          "pct": 1.3
        },
        "monthly_6": {
          "target": 2.0,
          "actual": 9.0
        },
        "monthly_7": {
          "target": 3.0
        },
        "yearly_2026": {
          "target": 6.0,
          "actual": 11.0,
          "pct": 1.8333
        },
        "quarterly_1": {
          "target": 6.0,
          "actual": 27.0,
          "pct": 4.5
        },
        "quarterly_2": {
          "target": 8.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 2.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_1": {
          "target": 1.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 1.0
        },
        "weekly_4_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_4_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 1.0,
          "actual": 3.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 8.0
        },
        "weekly_5_3": {
          "target": 2.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 1.0
        },
        "weekly_6_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 4.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 2.0
        },
        "weekly_7_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "weekly_7_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "MM3-I02.09": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số lượng đối tác SCMU chốt deal cấp kho nhạc",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 2.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 3.0,
          "actual": 2.0
        },
        "monthly_4": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_5": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 1.0,
          "actual": 0.0
        },
        "monthly_7": {
          "target": 2.0
        },
        "yearly_2026": {
          "target": 7.0,
          "actual": 2.0,
          "pct": 0.2857
        },
        "quarterly_1": {
          "target": 7.0,
          "actual": 1.0,
          "pct": 0.14
        },
        "quarterly_2": {
          "target": 8.0
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 2.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_3_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_4_5": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_5_4": {
          "target": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_6_4": {
          "target": 1.0,
          "actual": 0.0
        },
        "weekly_7_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_7_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_7_4": {
          "target": 1.0
        }
      }
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 2.1779
        }
      }
    },
    "TM4-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM4-I01.01": {
      "title": "Số lượng đối tác Sconnect Music chốt deal cấp quyền khai thác chỉ kho nhạc",
      "unit": "Lượt tiếp cận",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.49,
          "actual": 53694.0,
          "pct": 4892.0
        },
        "monthly_3": {
          "target": 150000.0,
          "actual": 265746.0,
          "pct": 1.7716
        },
        "monthly_4": {
          "target": 200000.0,
          "actual": 291696.0,
          "pct": 1.46
        },
        "monthly_5": {
          "target": 300000.0,
          "actual": 250488.0,
          "pct": 0.83
        },
        "monthly_6": {
          "target": 300000.0,
          "actual": 252400.0
        },
        "monthly_7": {
          "target": 250000.0
        },
        "yearly_2026": {
          "target": 300000.0,
          "actual": 653363.0,
          "pct": 2.1779
        },
        "quarterly_1": {
          "target": 450000.0,
          "actual": 794584.0,
          "pct": 1.77
        },
        "quarterly_2": {
          "target": 800000.0
        },
        "weekly_1_1": {
          "target": 25000.0,
          "actual": 17076.0,
          "pct": 0.68
        },
        "weekly_1_2": {
          "target": 25000.0,
          "actual": 16872.0,
          "pct": 0.67
        },
        "weekly_1_5": {
          "pct": 100000.0
        },
        "weekly_1_6": {
          "target": 336118.0,
          "actual": 3.36,
          "pct": 25000.0
        },
        "weekly_2_1": {
          "target": 6292.0,
          "actual": 0.25,
          "pct": 10000.0
        },
        "weekly_2_2": {
          "target": 41159.0,
          "actual": 4.12,
          "pct": 50000.0
        },
        "weekly_2_3": {
          "target": 130984.0,
          "actual": 2.62,
          "pct": 100000.0
        },
        "weekly_2_4": {
          "target": 157683.0,
          "actual": 1.58
        },
        "weekly_3_1": {
          "target": 30000.0,
          "actual": 30865.0,
          "pct": 1.03
        },
        "weekly_3_2": {
          "target": 50000.0,
          "actual": 71316.0,
          "pct": 1.43
        },
        "weekly_3_3": {
          "target": 80000.0,
          "actual": 90843.0,
          "pct": 1.14
        },
        "weekly_3_4": {
          "target": 90000.0,
          "actual": 71459.0,
          "pct": 0.79
        },
        "weekly_4_1": {
          "target": 50000.0,
          "actual": 35111.0,
          "pct": 0.7
        },
        "weekly_4_2": {
          "target": 50000.0,
          "actual": 80466.0,
          "pct": 1.61
        },
        "weekly_4_3": {
          "target": 80000.0,
          "actual": 83978.0,
          "pct": 1.05
        },
        "weekly_4_4": {
          "target": 100000.0,
          "actual": 78428.0,
          "pct": 0.78
        },
        "weekly_4_5": {
          "target": 80000.0,
          "actual": 15154.0,
          "pct": 0.19
        },
        "weekly_5_1": {
          "target": 50000.0,
          "actual": 1103.0,
          "pct": 0.02
        },
        "weekly_5_2": {
          "target": 100000.0,
          "actual": 83282.0,
          "pct": 0.83
        },
        "weekly_5_3": {
          "target": 100000.0,
          "actual": 91006.0,
          "pct": 0.91
        },
        "weekly_5_4": {
          "target": 124609.0
        },
        "weekly_6_1": {
          "target": 50000.0,
          "actual": 892.0,
          "pct": 0.02
        },
        "weekly_6_2": {
          "target": 80000.0,
          "actual": 97268.0,
          "pct": 1.22
        },
        "weekly_6_3": {
          "target": 80000.0,
          "actual": 93586.0,
          "pct": 1.17
        },
        "weekly_6_4": {
          "target": 108254.0,
          "actual": 59918.0,
          "pct": 0.55
        },
        "weekly_7_1": {
          "target": 30000.0,
          "actual": 12804.0,
          "pct": 0.43
        },
        "weekly_7_2": {
          "target": 60000.0,
          "actual": 14521.0,
          "pct": 0.24
        },
        "weekly_7_3": {
          "target": 50000.0,
          "actual": 13469.0,
          "pct": 0.27
        },
        "weekly_7_4": {
          "target": 50000.0
        }
      }
    },
    "TM4-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM4-I02.02": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 12.0
        }
      }
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 9.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 1.0
        }
      }
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 42250000.0
        }
      }
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "Số vi phạm chính sách",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 1.0
        }
      }
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "actual": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        }
      }
    },
    "TM6-I01.02": {
      "title": "",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0
        },
        "quarterly_1": {
          "target": 1.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.0
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.0
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "yearly_2026": {
          "pct": 1.0
        }
      }
    },
    "MM6-I03.02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "MM7-I01.01": {
      "title": "ROI",
      "unit": "Tỉ lệ AIVA áp dụng trong công việc của nhân sự",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.5,
          "actual": 0.8
        },
        "quarterly_1": {
          "target": 0.8
        },
        "quarterly_2": {
          "target": 0.8
        }
      }
    },
    "TM7-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "MM7-I02.01": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "MM7-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0
        },
        "quarterly_1": {
          "target": 1.0
        },
        "quarterly_2": {
          "target": 0.0
        },
        "weekly_1_5": {
          "pct": 1.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.85
        },
        "monthly_5": {
          "target": 0.85,
          "actual": 0.86,
          "pct": 1.0
        },
        "monthly_6": {
          "target": 0.85,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.85
        },
        "yearly_2026": {
          "target": 0.85
        },
        "quarterly_1": {
          "target": 0.85
        },
        "quarterly_2": {
          "target": 0.85
        },
        "weekly_1_5": {
          "pct": 0.85
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_6": {
          "actual": 2.0
        }
      }
    }
  },
  "SCS": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.5194,
          "actual": 75000000.0,
          "pct": 49022702.0
        },
        "monthly_3": {
          "target": 600000000.0,
          "actual": 191200257.0,
          "pct": 0.3187
        },
        "monthly_4": {
          "target": 779531220.0,
          "actual": 307057462.0,
          "pct": 0.3939
        },
        "monthly_5": {
          "target": 800179380.0,
          "actual": 262529133.0,
          "pct": 0.3281
        },
        "monthly_6": {
          "target": 940269460.0,
          "actual": 661129490.0,
          "pct": 0.7031
        },
        "monthly_7": {
          "target": 610402000.0
        },
        "monthly_8": {
          "actual": 951756000.0
        },
        "yearly_2026": {
          "target": 1481402760.0,
          "actual": 526046393.0,
          "pct": 0.3551
        },
        "quarterly_1": {
          "target": 2345419960.0,
          "actual": 1230716085.0,
          "pct": 0.5247
        },
        "quarterly_2": {
          "target": 2320942000.0
        },
        "weekly_1_1": {
          "target": 75000000.0,
          "actual": 26794480.0,
          "pct": 0.3573
        },
        "weekly_1_2": {
          "target": 75000000.0,
          "actual": 28613066.0,
          "pct": 0.3815
        },
        "weekly_1_4": {
          "target": 0.6536
        },
        "weekly_1_5": {
          "pct": 400000000.0
        },
        "weekly_1_6": {
          "target": 183931308.0,
          "actual": 0.4598,
          "pct": 100000000.0
        },
        "weekly_2_1": {
          "target": 43651232.0,
          "actual": 0.4365,
          "pct": 100000000.0
        },
        "weekly_2_2": {
          "target": 47470409.8,
          "actual": 0.4747,
          "pct": 100000000.0
        },
        "weekly_2_3": {
          "target": 62617752.0,
          "actual": 0.6262,
          "pct": 100000000.0
        },
        "weekly_2_4": {
          "target": 57725371.0,
          "actual": 0.5773
        },
        "weekly_3_1": {
          "target": 150000000.0,
          "actual": 34250030.0,
          "pct": 0.2283
        },
        "weekly_3_2": {
          "target": 150000000.0,
          "actual": 30665967.0,
          "pct": 0.2044
        },
        "weekly_3_3": {
          "target": 150000000.0,
          "actual": 40506864.18,
          "pct": 0.27
        },
        "weekly_3_4": {
          "target": 150000000.0,
          "actual": 53096705.0,
          "pct": 0.354
        },
        "weekly_4_1": {
          "target": 194882805.0,
          "actual": 76703425.0,
          "pct": 0.3936
        },
        "weekly_4_2": {
          "target": 194882805.0,
          "actual": 88024144.0,
          "pct": 0.4517
        },
        "weekly_4_3": {
          "target": 194882805.0,
          "actual": 69535865.0,
          "pct": 0.3568
        },
        "weekly_4_4": {
          "target": 194882805.0,
          "actual": 64329082.0,
          "pct": 0.3301
        },
        "weekly_4_5": {
          "target": 194882805.0,
          "actual": 45415426.0,
          "pct": 0.233
        },
        "weekly_5_1": {
          "target": 200044845.0,
          "actual": 55080657.0,
          "pct": 0.2753
        },
        "weekly_5_2": {
          "target": 200044845.0,
          "actual": 53507582.0,
          "pct": 0.2675
        },
        "weekly_5_3": {
          "target": 200044845.0,
          "actual": 60530464.0,
          "pct": 0.3026
        },
        "weekly_5_4": {
          "target": 200044845.0,
          "actual": 71997152.0,
          "pct": 0.3599
        },
        "weekly_6_1": {
          "target": 235067365.0,
          "actual": 154088458.0,
          "pct": 0.6555
        },
        "weekly_6_2": {
          "target": 235067365.0,
          "actual": 248847402.0,
          "pct": 1.0586
        },
        "weekly_6_3": {
          "target": 235067365.0,
          "actual": 157132381.0,
          "pct": 0.6685
        },
        "weekly_6_4": {
          "target": 235067365.0,
          "actual": 85159893.0,
          "pct": 0.3623
        },
        "weekly_7_1": {
          "target": 152600500.0,
          "actual": 73269299.0,
          "pct": 0.4801
        },
        "weekly_7_2": {
          "target": 152600500.0,
          "actual": 91891420.0,
          "pct": 0.6022
        },
        "weekly_7_3": {
          "target": 152600500.0,
          "actual": 106261919.0,
          "pct": 0.6963
        },
        "weekly_7_4": {
          "target": 152600500.0,
          "pct": 0.0
        },
        "weekly_7_6": {
          "actual": 758784000.0
        }
      }
    },
    "SM1-I01.02": {
      "title": "Doanh thu khai thác nội dung trên nền tảng Youtube",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.5194,
          "actual": 75000000.0,
          "pct": 49022702.0
        },
        "monthly_3": {
          "target": 600000000.0,
          "actual": 191200257.0,
          "pct": 0.3187
        },
        "monthly_4": {
          "target": 779531220.0,
          "actual": 307057462.0,
          "pct": 0.3939
        },
        "monthly_5": {
          "target": 800179380.0,
          "actual": 262529133.0,
          "pct": 0.3281
        },
        "monthly_6": {
          "target": 940269460.0,
          "actual": 661129490.0,
          "pct": 0.7031
        },
        "monthly_7": {
          "target": 610402000.0
        },
        "monthly_8": {
          "actual": 951756000.0
        },
        "yearly_2026": {
          "target": 1481402760.0,
          "actual": 526046393.0,
          "pct": 0.3551
        },
        "quarterly_1": {
          "target": 2345419960.0,
          "actual": 1230716085.0,
          "pct": 0.5247
        },
        "quarterly_2": {
          "target": 2320942000.0
        },
        "weekly_1_1": {
          "target": 75000000.0,
          "actual": 26794480.0,
          "pct": 0.3573
        },
        "weekly_1_2": {
          "target": 75000000.0,
          "actual": 28613066.0,
          "pct": 0.3815
        },
        "weekly_1_4": {
          "target": 0.6536
        },
        "weekly_1_5": {
          "pct": 400000000.0
        },
        "weekly_1_6": {
          "target": 183931308.0,
          "actual": 0.4598,
          "pct": 100000000.0
        },
        "weekly_2_1": {
          "target": 43651232.0,
          "actual": 0.4365,
          "pct": 100000000.0
        },
        "weekly_2_2": {
          "target": 47470409.8,
          "actual": 0.4747,
          "pct": 100000000.0
        },
        "weekly_2_3": {
          "target": 62617752.0,
          "actual": 0.6262,
          "pct": 100000000.0
        },
        "weekly_2_4": {
          "target": 57725371.0,
          "actual": 0.5773
        },
        "weekly_3_1": {
          "target": 150000000.0,
          "actual": 34250030.0,
          "pct": 0.2283
        },
        "weekly_3_2": {
          "target": 150000000.0,
          "actual": 30665967.0,
          "pct": 0.2044
        },
        "weekly_3_3": {
          "target": 150000000.0,
          "actual": 40506864.18,
          "pct": 0.27
        },
        "weekly_3_4": {
          "target": 150000000.0,
          "actual": 53096705.0,
          "pct": 0.354
        },
        "weekly_4_1": {
          "target": 194882805.0,
          "actual": 76703425.0,
          "pct": 0.3936
        },
        "weekly_4_2": {
          "target": 194882805.0,
          "actual": 88024144.0,
          "pct": 0.4517
        },
        "weekly_4_3": {
          "target": 194882805.0,
          "actual": 69535865.0,
          "pct": 0.3568
        },
        "weekly_4_4": {
          "target": 194882805.0,
          "actual": 64329082.0,
          "pct": 0.3301
        },
        "weekly_4_5": {
          "target": 194882805.0,
          "actual": 45415426.0,
          "pct": 0.233
        },
        "weekly_5_1": {
          "target": 200044845.0,
          "actual": 55080657.0,
          "pct": 0.2753
        },
        "weekly_5_2": {
          "target": 200044845.0,
          "actual": 53507582.0,
          "pct": 0.2675
        },
        "weekly_5_3": {
          "target": 200044845.0,
          "actual": 60530464.0
        },
        "weekly_5_4": {
          "target": 200044845.0,
          "actual": 71997152.0
        },
        "weekly_6_1": {
          "target": 235067365.0,
          "actual": 154088458.0,
          "pct": 0.6555
        },
        "weekly_6_2": {
          "target": 235067365.0,
          "actual": 248847402.0,
          "pct": 1.0586
        },
        "weekly_6_3": {
          "target": 235067365.0,
          "actual": 157132381.0,
          "pct": 0.6685
        },
        "weekly_6_4": {
          "target": 235067365.0,
          "actual": 85159893.0,
          "pct": 0.3623
        },
        "weekly_7_1": {
          "target": 152600500.0,
          "actual": 73269299.0,
          "pct": 0.4801
        },
        "weekly_7_2": {
          "target": 152600500.0,
          "actual": 91891420.0,
          "pct": 0.6022
        },
        "weekly_7_3": {
          "target": 152600500.0,
          "actual": 106261919.0,
          "pct": 0.6963
        },
        "weekly_7_4": {
          "target": 152600500.0
        },
        "weekly_7_6": {
          "actual": 758784000.0
        }
      }
    },
    "SM1-I02.01.02": {
      "title": "Doanh thu khai thác nội dung trên nền tảng Youtube",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "Doanh thu khai thác nội dung trên các nền tảng ngoài Youtube": {
      "title": "Doanh thu khai thác nội dung trên nền tảng Youtube",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I02.04": {
      "title": "Doanh thu khai thác nội dung trên nền tảng Youtube",
      "unit": "Doanh thu đối tác",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.95
        },
        "quarterly_1": {
          "target": 0.8,
          "actual": 0.8
        },
        "quarterly_2": {
          "target": 0.85
        }
      }
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "SM1-I03.01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.95
        },
        "quarterly_1": {
          "target": 0.8,
          "actual": 0.8
        },
        "quarterly_2": {
          "target": 0.85
        }
      }
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 37000000.0
        },
        "quarterly_2": {
          "target": 111000000.0
        }
      }
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 5000000.0
        },
        "quarterly_2": {
          "target": 15000000.0
        }
      }
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.9633,
          "actual": 36.0,
          "pct": 51.0
        },
        "monthly_3": {
          "target": 250.0,
          "actual": 274.0,
          "pct": 1.0485
        },
        "monthly_4": {
          "target": 311.0,
          "actual": 236.0,
          "pct": 0.8534
        },
        "monthly_5": {
          "target": 261.0,
          "actual": 226.0,
          "pct": 0.8659
        },
        "monthly_6": {
          "target": 152.0,
          "actual": 158.0,
          "pct": 1.0395
        },
        "monthly_7": {
          "target": 160.0
        },
        "yearly_2026": {
          "target": 642.0,
          "actual": 670.0,
          "pct": 1.0436
        },
        "quarterly_1": {
          "target": 696.0,
          "actual": 616.0,
          "pct": 0.8851
        },
        "quarterly_2": {
          "target": 632.0
        },
        "weekly_1_1": {
          "target": 137.0,
          "actual": 83.0,
          "pct": 0.6058
        },
        "weekly_1_2": {
          "target": 137.0,
          "actual": 133.0,
          "pct": 0.9708
        },
        "weekly_1_4": {
          "target": 1.4167
        },
        "weekly_1_5": {
          "pct": 177.0
        },
        "weekly_1_6": {
          "target": 200.0,
          "actual": 0.97,
          "pct": 42.0
        },
        "weekly_2_1": {
          "target": 30.0,
          "actual": 0.7143,
          "pct": 42.0
        },
        "weekly_2_2": {
          "target": 117.0,
          "actual": 2.7857,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 110.0
        },
        "weekly_2_4": {
          "target": 110.0
        },
        "weekly_3_1": {
          "target": 47.0,
          "actual": 60.0,
          "pct": 1.2766
        },
        "weekly_3_2": {
          "target": 47.0,
          "actual": 62.0,
          "pct": 1.3191
        },
        "weekly_3_3": {
          "target": 61.0,
          "actual": 78.0,
          "pct": 1.2787
        },
        "weekly_3_4": {
          "target": 61.0,
          "actual": 52.0,
          "pct": 0.8525
        },
        "weekly_4_1": {
          "target": 42.0,
          "actual": 34.0,
          "pct": 0.81
        },
        "weekly_4_2": {
          "target": 55.0,
          "actual": 41.0,
          "pct": 0.745
        },
        "weekly_4_3": {
          "target": 60.0,
          "actual": 67.0,
          "pct": 1.117
        },
        "weekly_4_4": {
          "target": 62.0,
          "actual": 51.0,
          "pct": 0.823
        },
        "weekly_4_5": {
          "target": 54.0,
          "actual": 55.0,
          "pct": 1.019
        },
        "weekly_5_1": {
          "target": 66.0,
          "actual": 38.0,
          "pct": 0.5758
        },
        "weekly_5_2": {
          "target": 69.0,
          "actual": 81.0,
          "pct": 1.1739
        },
        "weekly_5_3": {
          "target": 64.0,
          "actual": 49.0,
          "pct": 0.7656
        },
        "weekly_5_4": {
          "target": 64.0,
          "actual": 70.0,
          "pct": 1.0938
        },
        "weekly_6_1": {
          "target": 35.0,
          "actual": 32.0,
          "pct": 0.9143
        },
        "weekly_6_2": {
          "target": 37.0,
          "actual": 24.0,
          "pct": 0.6486
        },
        "weekly_6_3": {
          "target": 44.0,
          "actual": 32.0,
          "pct": 0.7273
        },
        "weekly_6_4": {
          "target": 39.0,
          "actual": 68.0,
          "pct": 1.7436
        },
        "weekly_7_1": {
          "target": 35.0,
          "actual": 26.0,
          "pct": 0.7429
        },
        "weekly_7_2": {
          "target": 35.0,
          "actual": 34.0
        },
        "weekly_7_3": {
          "target": 35.0,
          "actual": 36.0
        },
        "weekly_7_4": {
          "target": 36.0
        }
      }
    },
    "Chi phí nhân sự": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_3": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 8.0,
          "actual": 8.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 24.0,
          "actual": 2.0,
          "pct": 0.0833
        },
        "weekly_1_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_2": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 0.0
        },
        "weekly_2_4": {
          "target": 0.0
        },
        "weekly_2_5": {
          "pct": 0.35
        },
        "weekly_3_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_3_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_3_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Sản phẩm nội dung độc đáo": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.8182,
          "actual": 6.0,
          "pct": 7.0
        },
        "monthly_3": {
          "target": 16.0,
          "actual": 17.0,
          "pct": 1.0625
        },
        "monthly_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 6.0,
          "actual": 7.0,
          "pct": 1.1667
        },
        "yearly_2026": {
          "target": 88.0,
          "actual": 67.0,
          "pct": 0.7614
        },
        "quarterly_1": {
          "target": 24.0,
          "actual": 9.0,
          "pct": 0.375
        },
        "weekly_1_1": {
          "target": 11.0,
          "actual": 9.0,
          "pct": 0.8182
        },
        "weekly_1_2": {
          "target": 11.0,
          "actual": 9.0,
          "pct": 0.8182
        },
        "weekly_1_4": {
          "target": 1.1667
        },
        "weekly_1_5": {
          "actual": 0.45,
          "pct": 40.0
        },
        "weekly_1_6": {
          "target": 32.0,
          "actual": 0.8,
          "pct": 12.0
        },
        "weekly_2_1": {
          "target": 4.0,
          "actual": 0.3333,
          "pct": 12.0
        },
        "weekly_2_2": {
          "target": 9.0,
          "actual": 0.75,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 14.0
        },
        "weekly_2_4": {
          "target": 14.0
        },
        "weekly_2_5": {
          "pct": 0.45
        },
        "weekly_3_1": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_3_2": {
          "target": 4.0,
          "actual": 2.0,
          "pct": 0.5
        },
        "weekly_3_3": {
          "target": 4.0,
          "actual": 5.0,
          "pct": 1.25
        },
        "weekly_3_4": {
          "target": 4.0,
          "actual": 3.0,
          "pct": 0.75
        },
        "weekly_4_1": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_6_2": {
          "target": 4.0,
          "actual": 2.0,
          "pct": 0.5
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_6_4": {
          "target": 3.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "Sản phẩm nội dung thường xuyên": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.9796,
          "actual": 15.0,
          "pct": 22.0
        },
        "monthly_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 173.0,
          "actual": 201.0,
          "pct": 1.1618
        },
        "quarterly_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_1": {
          "target": 63.0,
          "actual": 37.0,
          "pct": 0.5873
        },
        "weekly_1_2": {
          "target": 63.0,
          "actual": 62.0,
          "pct": 0.9841
        },
        "weekly_1_4": {
          "target": 1.4667
        },
        "weekly_1_5": {
          "actual": 0.45,
          "pct": 33.0
        },
        "weekly_1_6": {
          "target": 35.0,
          "actual": 1.0606,
          "pct": 15.0
        },
        "weekly_2_1": {
          "target": 13.0,
          "actual": 0.8667,
          "pct": 15.0
        },
        "weekly_2_2": {
          "target": 54.0,
          "actual": 3.6,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 48.0
        },
        "weekly_2_4": {
          "target": 48.0
        },
        "weekly_3_1": {
          "target": 0.0,
          "actual": 2.0
        },
        "weekly_3_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_3_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_3": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_4": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_1": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_2": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_6_3": {
          "target": 0.0,
          "actual": 0.0
        }
      }
    },
    "Sản phẩm nội dung xu hướng": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_2": {
          "target": 0.9796,
          "actual": 15.0,
          "pct": 22.0
        },
        "monthly_3": {
          "target": 226.0,
          "actual": 249.0,
          "pct": 1.1018
        },
        "monthly_4": {
          "target": 307.0,
          "actual": 232.0,
          "pct": 0.7557
        },
        "monthly_5": {
          "target": 261.0,
          "actual": 226.0,
          "pct": 0.8659
        },
        "monthly_6": {
          "target": 146.0,
          "actual": 151.0,
          "pct": 1.0342
        },
        "yearly_2026": {
          "target": 349.0,
          "actual": 394.0,
          "pct": 1.1289
        },
        "quarterly_1": {
          "target": 648.0,
          "actual": 605.0,
          "pct": 0.9336
        },
        "quarterly_2": {
          "target": 416.0
        },
        "weekly_1_1": {
          "target": 63.0,
          "actual": 37.0,
          "pct": 0.5873
        },
        "weekly_1_2": {
          "target": 63.0,
          "actual": 62.0,
          "pct": 0.9841
        },
        "weekly_1_4": {
          "target": 1.4667
        },
        "weekly_1_5": {
          "actual": 0.1,
          "pct": 104.0
        },
        "weekly_1_6": {
          "target": 133.0,
          "actual": 1.2788,
          "pct": 15.0
        },
        "weekly_2_1": {
          "target": 13.0,
          "actual": 0.8667,
          "pct": 15.0
        },
        "weekly_2_2": {
          "target": 54.0,
          "actual": 3.6,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 48.0
        },
        "weekly_2_4": {
          "target": 48.0
        },
        "weekly_2_5": {
          "pct": 0.2
        },
        "weekly_3_1": {
          "target": 41.0,
          "actual": 52.0,
          "pct": 1.2683
        },
        "weekly_3_2": {
          "target": 41.0,
          "actual": 58.0,
          "pct": 1.4146
        },
        "weekly_3_3": {
          "target": 55.0,
          "actual": 72.0,
          "pct": 1.3091
        },
        "weekly_3_4": {
          "target": 55.0,
          "actual": 47.0,
          "pct": 0.8545
        },
        "weekly_4_1": {
          "target": 38.0,
          "actual": 29.0,
          "pct": 0.763
        },
        "weekly_4_2": {
          "target": 55.0,
          "actual": 41.0,
          "pct": 0.745
        },
        "weekly_4_3": {
          "target": 60.0,
          "actual": 67.0,
          "pct": 0.0
        },
        "weekly_4_4": {
          "target": 60.0,
          "actual": 50.0,
          "pct": 0.0
        },
        "weekly_4_5": {
          "target": 52.0,
          "actual": 53.0,
          "pct": 1.019
        },
        "weekly_5_1": {
          "target": 66.0,
          "actual": 38.0,
          "pct": 0.5758
        },
        "weekly_5_2": {
          "target": 69.0,
          "actual": 81.0,
          "pct": 1.1739
        },
        "weekly_5_3": {
          "target": 64.0,
          "actual": 49.0,
          "pct": 0.7656
        },
        "weekly_5_4": {
          "target": 64.0,
          "actual": 70.0,
          "pct": 1.0938
        },
        "weekly_6_1": {
          "target": 33.0,
          "actual": 31.0,
          "pct": 0.9394
        },
        "weekly_6_2": {
          "target": 33.0,
          "actual": 22.0,
          "pct": 0.6667
        },
        "weekly_6_3": {
          "target": 41.0,
          "actual": 32.0,
          "pct": 0.7805
        },
        "weekly_6_4": {
          "target": 36.0,
          "actual": 68.0,
          "pct": 1.8889
        }
      }
    },
    "Sản phẩm phái sinh": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0
        },
        "quarterly_2": {
          "target": 160.0
        },
        "weekly_7_1": {
          "target": 9.0,
          "actual": 5.0,
          "pct": 0.5556
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_4": {
          "target": 8.0
        }
      }
    },
    "Sản phẩm dự án kids song 01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 36.0
        },
        "monthly_8": {
          "actual": 52.0
        },
        "quarterly_2": {
          "target": 160.0
        },
        "weekly_7_1": {
          "target": 7.0,
          "actual": 4.0,
          "pct": 0.5714
        },
        "weekly_7_2": {
          "target": 8.0,
          "actual": 8.0
        },
        "weekly_7_3": {
          "target": 8.0,
          "actual": 9.0
        },
        "weekly_7_4": {
          "target": 9.0
        },
        "weekly_7_6": {
          "actual": 50.0
        }
      }
    },
    "Sản phẩm dự án kids song 02": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 16.0
        },
        "quarterly_2": {
          "target": 96.0
        },
        "weekly_7_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.3333
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 2.0
        },
        "weekly_7_3": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_7_4": {
          "target": 3.0
        }
      }
    },
    "Sản phẩm dự án TQ": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 72.0
        },
        "quarterly_2": {
          "target": 216.0
        },
        "weekly_7_1": {
          "target": 16.0,
          "actual": 16.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 16.0,
          "actual": 16.0
        },
        "weekly_7_3": {
          "target": 16.0,
          "actual": 16.0
        },
        "weekly_7_4": {
          "target": 16.0
        },
        "weekly_7_6": {
          "target": 124.0,
          "actual": 26.0
        }
      }
    },
    "Sản phẩm dubing": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "Tác phẩm điện ảnh": {
      "title": "ROI",
      "unit": "Movie Chiến Binh Gốm",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM2-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I02.01": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "SL video đạt ngưỡng 1 triệu views (youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Tỷ lệ % hoàn thành": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube SCS",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_2": {
          "target": 0.8781,
          "actual": 4250000.0,
          "pct": 4314877.0
        },
        "monthly_3": {
          "target": 24000000.0,
          "actual": 21134187.0,
          "pct": 0.8806
        },
        "monthly_4": {
          "target": 26400000.0,
          "actual": 31590730.0,
          "pct": 1.1966
        },
        "monthly_5": {
          "target": 28600000.0,
          "actual": 53327976.0,
          "pct": 1.8646
        },
        "monthly_6": {
          "target": 31400000.0,
          "actual": 61789503.0,
          "pct": 1.9678
        },
        "monthly_7": {
          "target": 75676084.0
        },
        "monthly_8": {
          "actual": 95571356.0
        },
        "yearly_2026": {
          "target": 60000000.0,
          "actual": 57777837.0,
          "pct": 0.963
        },
        "quarterly_1": {
          "target": 107736905.0,
          "actual": 146708209.0,
          "pct": 1.3617
        },
        "quarterly_2": {
          "target": 256215123.0
        },
        "weekly_1_1": {
          "target": 4250000.0,
          "actual": 2632370.0,
          "pct": 0.6194
        },
        "weekly_1_2": {
          "target": 4250000.0,
          "actual": 2849632.0,
          "pct": 0.6705
        },
        "weekly_1_4": {
          "target": 1.0153
        },
        "weekly_1_5": {
          "pct": 19000000.0
        },
        "weekly_1_6": {
          "target": 21726043.0,
          "actual": 1.1435,
          "pct": 4750000.0
        },
        "weekly_2_1": {
          "target": 5078621.0,
          "actual": 1.0692,
          "pct": 4750000.0
        },
        "weekly_2_2": {
          "target": 5610061.0,
          "actual": 1.1811,
          "pct": 4750000.0
        },
        "weekly_2_3": {
          "target": 6006439.0,
          "actual": 1.2645,
          "pct": 4750000.0
        },
        "weekly_2_4": {
          "target": 5117285.0,
          "actual": 1.0773
        },
        "weekly_3_1": {
          "target": 6000000.0,
          "actual": 4113416.0,
          "pct": 0.6856
        },
        "weekly_3_2": {
          "target": 6000000.0,
          "actual": 4485694.0,
          "pct": 0.7476
        },
        "weekly_3_3": {
          "target": 6000000.0,
          "actual": 4802620.0,
          "pct": 0.8004
        },
        "weekly_3_4": {
          "target": 6000000.0,
          "actual": 5167873.0,
          "pct": 0.8613
        },
        "weekly_4_1": {
          "target": 6600000.0,
          "actual": 5616408.0,
          "pct": 0.851
        },
        "weekly_4_2": {
          "target": 6600000.0,
          "actual": 7164255.0,
          "pct": 1.0855
        },
        "weekly_4_3": {
          "target": 6600000.0,
          "actual": 7631967.0,
          "pct": 1.1564
        },
        "weekly_4_4": {
          "target": 6600000.0,
          "actual": 9311675.0,
          "pct": 1.4109
        },
        "weekly_4_5": {
          "target": 6600000.0,
          "actual": 9305486.0,
          "pct": 1.4099
        },
        "weekly_5_1": {
          "target": 7150000.0,
          "actual": 6546387.0,
          "pct": 0.9156
        },
        "weekly_5_2": {
          "target": 7150000.0,
          "actual": 7878983.0,
          "pct": 1.102
        },
        "weekly_5_3": {
          "target": 7150000.0,
          "actual": 14489318.0,
          "pct": 2.0265
        },
        "weekly_5_4": {
          "target": 7150000.0,
          "actual": 19965121.0,
          "pct": 2.7923
        },
        "weekly_6_1": {
          "target": 7850000.0,
          "actual": 14292543.0,
          "pct": 1.8207
        },
        "weekly_6_2": {
          "target": 7850000.0,
          "actual": 17080378.0,
          "pct": 2.1758
        },
        "weekly_6_3": {
          "target": 7850000.0,
          "actual": 16191218.0,
          "pct": 2.0626
        },
        "weekly_6_4": {
          "target": 7850000.0,
          "actual": 11636259.0,
          "pct": 1.4823
        },
        "weekly_7_1": {
          "target": 18919021.0,
          "actual": 15651619.0,
          "pct": 0.8273
        },
        "weekly_7_2": {
          "target": 18919021.0,
          "actual": 25173299.0,
          "pct": 1.3306
        },
        "weekly_7_3": {
          "target": 18919021.0,
          "actual": 17728401.0,
          "pct": 0.9371
        },
        "weekly_7_4": {
          "target": 18919021.0
        },
        "weekly_7_6": {
          "actual": 84967682.0
        }
      }
    },
    "SM3-I01.01": {
      "title": "Số lượng đối tác SCMU tiếp cân",
      "unit": "Số đối tác hợp tác sản xuất kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 2.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 0.0
        }
      }
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "SM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh (Youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 20.0,
          "actual": 25.0,
          "pct": 1.25
        },
        "quarterly_1": {
          "target": 30.0
        }
      }
    },
    "SM4-I02.02": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh (Youtube)",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 5.0,
          "actual": 2.0,
          "pct": 0.4
        },
        "quarterly_1": {
          "target": 5.0
        }
      }
    },
    "SM4-I02.03": {
      "title": "Số vi phạm chính sách",
      "unit": "Số Kênh Youtube phát triển mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_4": {
          "target": 6.0,
          "actual": 8.0,
          "pct": 1.3333
        },
        "monthly_5": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.6667
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 2.0
        },
        "quarterly_1": {
          "target": 15.0,
          "actual": 13.0
        },
        "quarterly_2": {
          "target": 5.0
        },
        "weekly_6_1": {
          "target": 2.0
        }
      }
    },
    "SM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "Số Kênh Youtube phát triển mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_4": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.3333
        },
        "monthly_6": {
          "target": 5.0,
          "actual": 5.0
        },
        "monthly_7": {
          "target": 2.0
        },
        "quarterly_1": {
          "target": 8.0,
          "actual": 2.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_6_1": {
          "target": 5.0
        }
      }
    },
    "Số kênh vượt ngưỡng >3k": {
      "title": "Số vi phạm chính sách",
      "unit": "Số Kênh Youtube phát triển mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_5": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "monthly_6": {
          "target": 2.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 2.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 2.0
        },
        "quarterly_2": {
          "target": 2.0
        },
        "weekly_6_1": {
          "target": 2.0
        }
      }
    },
    "Số kênh vượt ngưỡng >5k": {
      "title": "Số vi phạm chính sách",
      "unit": "Số Kênh Youtube phát triển mới",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "quarterly_1": {
          "target": 2.0,
          "actual": 2.0
        }
      }
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 19.0
        },
        "quarterly_2": {
          "target": 23.0
        }
      }
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_6": {
          "target": 2.0,
          "actual": 2.0
        },
        "monthly_7": {
          "target": 16.0
        },
        "quarterly_2": {
          "target": 20.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.01": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "TM5-I01.02": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        }
      }
    },
    "Cơ chế chính sách hợp tác sản xuât, kinh doanh.": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        }
      }
    },
    "TM5-I01.04": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        }
      }
    },
    "Hoàn chỉnh khung năng lực về đánh giá tính hiệu quả sử dụng AI.": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "Quản trị hiệu suất",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "Số vi phạm chính sách",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Số NDSX/ số nhân sự sx trong kỳ (ko tính quản lý BP/DA)": {
      "title": "Số buổi đào tạo được tổ chức",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 3.0
        },
        "yearly_2026": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 3.0
        }
      }
    },
    "Số buổi đào tạo được tổ chức/Tháng": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "quarterly_1": {
          "target": 1.0,
          "actual": 1.0
        },
        "weekly_1_5": {
          "pct": 1.0
        },
        "weekly_1_6": {
          "target": 1.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "SM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.85
        },
        "yearly_2026": {
          "target": 0.85,
          "actual": 0.85
        },
        "quarterly_1": {
          "target": 0.85,
          "actual": 0.9
        },
        "weekly_1_5": {
          "pct": 0.85
        },
        "weekly_1_6": {
          "target": 0.85
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Tỷ lệ nhân sự đạt đánh giá giá năng lực về hiệu quả ứng dụng AI vào công việc.": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 0.85
        },
        "yearly_2026": {
          "target": 0.85,
          "actual": 0.85
        },
        "quarterly_1": {
          "target": 0.85,
          "actual": 0.8
        },
        "weekly_1_5": {
          "pct": 0.85
        },
        "weekly_1_6": {
          "target": 0.85
        }
      }
    },
    "Thúc đẩy văn hóa hiệu suất cao cùng AI": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Thúc đẩy văn hóa sáng tạo cùng AI": {
      "title": "Số các đề xuất sáng tạo/ giải pháp AI được ghi nhận",
      "unit": "Hoạt động",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_3": {
          "target": 3.0
        },
        "yearly_2026": {
          "target": 3.0,
          "actual": 3.0
        },
        "weekly_1_5": {
          "pct": 3.0
        },
        "weekly_1_6": {
          "target": 3.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.95
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0
        },
        "monthly_7": {
          "target": 0.95
        },
        "yearly_2026": {
          "target": 0.95,
          "actual": 0.95
        },
        "quarterly_1": {
          "target": 0.95,
          "actual": 0.95
        },
        "quarterly_2": {
          "target": 0.95
        },
        "weekly_1_5": {
          "pct": 0.95
        },
        "weekly_1_6": {
          "target": 0.95
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_6": {
          "actual": 2.0
        }
      }
    }
  },
  "CN": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "NM1-I01.01",
      "pic": "PTGĐ Ly",
      "periods": {
        "quarterly_1": {
          "target": -0.7
        },
        "quarterly_2": {
          "target": -0.286
        }
      }
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_4": {
          "target": 56684590.0,
          "actual": 51577070.0,
          "pct": 0.91
        },
        "monthly_5": {
          "target": 120000000.0,
          "actual": 72273298.0,
          "pct": 0.6
        },
        "monthly_6": {
          "target": 200000000.0,
          "actual": 76774078.0,
          "pct": 0.38
        },
        "monthly_7": {
          "target": 250000000.0
        },
        "quarterly_1": {
          "target": 360000000.0,
          "actual": 232675174.0,
          "pct": 0.646
        },
        "quarterly_2": {
          "target": 1040000000.0
        },
        "weekly_4_1": {
          "target": 11414200.0,
          "actual": 14398935.0,
          "pct": 1.26
        },
        "weekly_4_2": {
          "target": 11414200.0,
          "actual": 10536999.0,
          "pct": 0.92
        },
        "weekly_4_3": {
          "target": 11414200.0,
          "actual": 9242879.0,
          "pct": 0.81
        },
        "weekly_4_4": {
          "target": 11414200.0,
          "actual": 7776192.0,
          "pct": 0.68
        },
        "weekly_4_5": {
          "target": 11414200.0,
          "actual": 7643225.0,
          "pct": 0.67
        },
        "weekly_5_1": {
          "target": 27096774.0,
          "actual": 14295027.0,
          "pct": 0.53
        },
        "weekly_5_2": {
          "target": 27096774.0,
          "actual": 16950123.0,
          "pct": 0.63
        },
        "weekly_5_3": {
          "target": 27096774.0,
          "actual": 15208620.0,
          "pct": 0.56
        },
        "weekly_5_4": {
          "target": 27096774.0,
          "actual": 25819528.0,
          "pct": 0.95
        },
        "weekly_6_1": {
          "target": 46700000.0,
          "actual": 17096931.0,
          "pct": 0.37
        },
        "weekly_6_2": {
          "target": 46700000.0,
          "actual": 15779486.0,
          "pct": 0.34
        },
        "weekly_6_3": {
          "target": 46700000.0,
          "actual": 17088392.0,
          "pct": 0.37
        },
        "weekly_6_4": {
          "target": 46700000.0,
          "actual": 16512627.0,
          "pct": 0.35
        },
        "weekly_7_1": {
          "target": 53655914.0,
          "actual": 13438745.0,
          "pct": 0.25
        },
        "weekly_7_2": {
          "target": 56451613.0,
          "actual": 13118645.0,
          "pct": 0.23
        },
        "weekly_7_3": {
          "target": 56451613.0,
          "actual": 12238088.0,
          "pct": 0.22
        },
        "weekly_7_4": {
          "target": 56451613.0
        }
      }
    },
    "NM1-I02.01.01": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu Game",
      "formula": "NM1-I01.01",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_4": {
          "target": 0.0,
          "actual": 53138855.0
        },
        "monthly_5": {
          "target": 70000000.0,
          "actual": 36830500.0,
          "pct": 0.53
        },
        "monthly_6": {
          "target": 120000000.0,
          "actual": 34454965.0,
          "pct": 0.29
        },
        "monthly_7": {
          "target": 150000000.0
        },
        "quarterly_1": {
          "target": 190000000.0,
          "actual": 124424320.0,
          "pct": 0.655
        },
        "quarterly_2": {
          "target": 650000000.0
        },
        "weekly_4_1": {
          "target": 0.0,
          "actual": 7955435.0
        },
        "weekly_4_2": {
          "target": 0.0,
          "actual": 3187442.0
        },
        "weekly_4_3": {
          "target": 0.0,
          "actual": 184327.0
        },
        "weekly_4_4": {
          "target": 0.0,
          "actual": 131799.0
        },
        "weekly_4_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_5_1": {
          "target": 15806452.0,
          "actual": 7266252.0,
          "pct": 0.46
        },
        "weekly_5_2": {
          "target": 15806452.0,
          "actual": 8171910.0,
          "pct": 0.52
        },
        "weekly_5_3": {
          "target": 15806452.0,
          "actual": 6722310.0,
          "pct": 0.43
        },
        "weekly_5_4": {
          "target": 15806452.0,
          "actual": 14670028.0
        },
        "weekly_6_1": {
          "target": 28000000.0,
          "actual": 8798729.0,
          "pct": 0.31
        },
        "weekly_6_2": {
          "target": 28000000.0,
          "actual": 6814937.0,
          "pct": 0.24
        },
        "weekly_6_3": {
          "target": 28000000.0,
          "actual": 6852830.0,
          "pct": 0.24
        },
        "weekly_6_4": {
          "target": 28000000.0,
          "actual": 6966090.0,
          "pct": 0.25
        },
        "weekly_7_1": {
          "target": 32193548.0,
          "actual": 6732500.0,
          "pct": 0.21
        },
        "weekly_7_2": {
          "target": 33870968.0,
          "actual": 6052957.0,
          "pct": 0.18
        },
        "weekly_7_3": {
          "target": 33870968.0,
          "actual": 6532073.0,
          "pct": 0.19
        },
        "weekly_7_4": {
          "target": 33870968.0
        }
      }
    },
    "NM1-I02.01.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu YouTube- nội bộ",
      "formula": "NM1-I01.01",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_4": {
          "target": 40000000.0,
          "actual": 34222500.0,
          "pct": 0.86
        },
        "monthly_5": {
          "target": 50000000.0,
          "actual": 35442798.0,
          "pct": 0.71
        },
        "monthly_6": {
          "target": 80000000.0,
          "actual": 42319113.0,
          "pct": 0.53
        },
        "monthly_7": {
          "target": 100000000.0
        },
        "quarterly_1": {
          "target": 170000000.0,
          "actual": 108250854.0,
          "pct": 0.637
        },
        "quarterly_2": {
          "target": 390000000.0
        },
        "weekly_4_1": {
          "target": 11414200.0,
          "actual": 6443500.0,
          "pct": 0.56
        },
        "weekly_4_2": {
          "target": 11414200.0,
          "actual": 7349557.0,
          "pct": 0.64
        },
        "weekly_4_3": {
          "target": 11414200.0,
          "actual": 9058552.0,
          "pct": 0.79
        },
        "weekly_4_4": {
          "target": 11414200.0,
          "actual": 7644393.0,
          "pct": 0.67
        },
        "weekly_4_5": {
          "target": 11414200.0,
          "actual": 7643225.0,
          "pct": 0.67
        },
        "weekly_5_1": {
          "target": 11290323.0,
          "actual": 7028775.0,
          "pct": 0.62
        },
        "weekly_5_2": {
          "target": 11290323.0,
          "actual": 8778213.0,
          "pct": 0.78
        },
        "weekly_5_3": {
          "target": 11290323.0,
          "actual": 8486310.0,
          "pct": 0.75
        },
        "weekly_5_4": {
          "target": 11290323.0,
          "actual": 11149500.0
        },
        "weekly_6_1": {
          "target": 18700000.0,
          "actual": 8298202.0,
          "pct": 0.44
        },
        "weekly_6_2": {
          "target": 18700000.0,
          "actual": 8964549.0,
          "pct": 0.48
        },
        "weekly_6_3": {
          "target": 18700000.0,
          "actual": 10235562.0,
          "pct": 0.55
        },
        "weekly_6_4": {
          "target": 18700000.0,
          "actual": 9546537.0,
          "pct": 0.51
        },
        "weekly_7_1": {
          "target": 21462366.0,
          "actual": 6706245.0,
          "pct": 0.31
        },
        "weekly_7_2": {
          "target": 22580645.0,
          "actual": 7065688.0,
          "pct": 0.31
        },
        "weekly_7_3": {
          "target": 22580645.0,
          "actual": 5706015.0,
          "pct": 0.25
        },
        "weekly_7_4": {
          "target": 22580645.0
        }
      }
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM1-I05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.01": {
      "title": "ROI",
      "unit": "Tối ưu chi phí nhân sự",
      "formula": "NM1-I01.01",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "NM1-I05.01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "NM2-I01": {
      "title": "Số vi phạm chính sách",
      "unit": "Số lượng Game/Tính năng mới phát hành đúng hạn",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_4": {
          "target": 15.0,
          "actual": 15.0,
          "pct": 1.0
        },
        "monthly_5": {
          "target": 16.0,
          "actual": 33.0,
          "pct": 2.06
        },
        "monthly_6": {
          "target": 10.0,
          "actual": 10.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 12.0
        },
        "quarterly_1": {
          "target": 50.0,
          "actual": 57.0,
          "pct": 1.14
        },
        "quarterly_2": {
          "target": 40.0
        },
        "weekly_4_1": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_4_3": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_4": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_4_5": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_5_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_5_2": {
          "target": 5.0,
          "actual": 4.0,
          "pct": 0.8
        },
        "weekly_5_3": {
          "target": 4.0,
          "actual": 2.0,
          "pct": 0.5
        },
        "weekly_5_4": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "weekly_6_1": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.67
        },
        "weekly_6_2": {
          "target": 2.0,
          "actual": 3.0,
          "pct": 1.5
        },
        "weekly_6_3": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 0.33
        },
        "weekly_6_4": {
          "target": 3.0,
          "actual": 2.0,
          "pct": 0.67
        },
        "weekly_7_1": {
          "target": 4.0,
          "actual": 4.0,
          "pct": 1.0
        },
        "weekly_7_2": {
          "target": 3.0,
          "actual": 5.0,
          "pct": 1.67
        },
        "weekly_7_3": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 0.5
        },
        "weekly_7_4": {
          "target": 3.0
        }
      }
    },
    "Số lượng Game hoặc Tính năng mới phát hành": {
      "title": "Số lượng video hoàn thành sản xuất",
      "unit": "Số lượng sản phẩm upload",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "quarterly_1": {
          "actual": 0.0
        }
      }
    },
    "Số lượng video sản xuất được upload lên kênh YT lần đầu": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01.05": {
      "title": "Số lượt cài đặt game/app",
      "unit": "Download",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_5": {
          "target": 200000.0,
          "actual": 128053.0,
          "pct": 0.64
        },
        "monthly_6": {
          "target": 300000.0,
          "actual": 139278.0,
          "pct": 0.46
        },
        "monthly_7": {
          "target": 2600000.0
        },
        "quarterly_1": {
          "target": 500000.0,
          "actual": 242053.0,
          "pct": 0.484
        },
        "weekly_5_1": {
          "target": 50000.0,
          "actual": 24935.0,
          "pct": 0.5
        },
        "weekly_5_2": {
          "target": 50000.0,
          "actual": 26609.0,
          "pct": 0.53
        },
        "weekly_5_3": {
          "target": 50000.0,
          "actual": 26586.0,
          "pct": 0.53
        },
        "weekly_5_4": {
          "target": 50000.0,
          "actual": 49923.0,
          "pct": 1.0
        },
        "weekly_6_1": {
          "target": 75000.0,
          "actual": 31119.0,
          "pct": 0.41
        },
        "weekly_6_2": {
          "target": 75000.0,
          "actual": 25288.0,
          "pct": 0.34
        },
        "weekly_6_3": {
          "target": 75000.0,
          "actual": 22761.0,
          "pct": 0.3
        },
        "weekly_6_4": {
          "target": 75000.0,
          "actual": 21300.0,
          "pct": 0.28
        },
        "weekly_7_1": {
          "target": 439355.0,
          "actual": 35420.0,
          "pct": 0.08
        },
        "weekly_7_2": {
          "target": 587097.0,
          "actual": 34857.0,
          "pct": 0.06
        },
        "weekly_7_3": {
          "target": 587097.0,
          "actual": 58036.0,
          "pct": 0.1
        },
        "weekly_7_4": {
          "target": 587097.0
        }
      }
    },
    "Số lượt tải/ cài đặt game app": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube DA01",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_4": {
          "target": 8200000.0,
          "actual": 6222000.0,
          "pct": 0.76
        },
        "monthly_5": {
          "target": 8136000.0,
          "actual": 6497000.0,
          "pct": 0.8
        },
        "monthly_6": {
          "target": 8000000.0,
          "actual": 5694978.0,
          "pct": 0.71
        },
        "monthly_7": {
          "target": 10300000.0
        },
        "quarterly_1": {
          "target": 24336000.0,
          "actual": 18366474.0,
          "pct": 0.755
        },
        "quarterly_2": {
          "target": 40000000.0
        },
        "weekly_4_1": {
          "target": 1640000.0,
          "actual": 1372504.0,
          "pct": 0.84
        },
        "weekly_4_2": {
          "target": 1640000.0,
          "actual": 1486990.0,
          "pct": 0.91
        },
        "weekly_4_3": {
          "target": 1640000.0,
          "actual": 1461553.0,
          "pct": 0.89
        },
        "weekly_4_4": {
          "target": 1640000.0,
          "actual": 1451052.0,
          "pct": 0.88
        },
        "weekly_4_5": {
          "target": 1640000.0,
          "actual": 1451052.0,
          "pct": 0.88
        },
        "weekly_5_1": {
          "target": 2034000.0,
          "actual": 1385100.0,
          "pct": 0.68
        },
        "weekly_5_2": {
          "target": 2034000.0,
          "actual": 1630115.0,
          "pct": 0.8
        },
        "weekly_5_3": {
          "target": 2034000.0,
          "actual": 1526702.0,
          "pct": 0.75
        },
        "weekly_5_4": {
          "target": 2034000.0,
          "actual": 1955083.0,
          "pct": 0.96
        },
        "weekly_6_1": {
          "target": 2000000.0,
          "actual": 1504545.0,
          "pct": 0.75
        },
        "weekly_6_2": {
          "target": 2000000.0,
          "actual": 1394525.0,
          "pct": 0.7
        },
        "weekly_6_3": {
          "target": 2000000.0,
          "actual": 1372091.0,
          "pct": 0.69
        },
        "weekly_6_4": {
          "target": 2000000.0,
          "actual": 1199201.0,
          "pct": 0.6
        },
        "weekly_7_1": {
          "target": 2194624.0,
          "actual": 605648.0,
          "pct": 0.28
        },
        "weekly_7_2": {
          "target": 2325806.0,
          "actual": 737300.0,
          "pct": 0.32
        },
        "weekly_7_3": {
          "target": 2325806.0,
          "actual": 610379.0,
          "pct": 0.26
        },
        "weekly_7_4": {
          "target": 2325806.0
        }
      }
    },
    "NM3-I01.04": {
      "title": "Số lượng traffic nền tảng web game",
      "unit": "Traffic",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "quarterly_1": {
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 12000000.0
        },
        "weekly_6_1": {
          "actual": 8061.0
        },
        "weekly_7_1": {
          "actual": 11021.0
        },
        "weekly_7_2": {
          "actual": 13630.0
        },
        "weekly_7_3": {
          "actual": 37978.0
        }
      }
    },
    "NM3-I01.06": {
      "title": "Số user game active",
      "unit": "User",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "quarterly_1": {
          "actual": 0.0
        },
        "weekly_6_1": {
          "actual": 286.0
        },
        "weekly_6_2": {
          "actual": 478.0
        },
        "weekly_6_3": {
          "actual": 623.0
        },
        "weekly_6_4": {
          "actual": 566.0
        },
        "weekly_7_1": {
          "actual": 643.0
        },
        "weekly_7_2": {
          "actual": 684.0
        },
        "weekly_7_3": {
          "actual": 7100.0
        }
      }
    },
    "Số User game active": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "NM4-I01.01": {
      "title": "Số lượng nền tảng game phát triển mới",
      "unit": "Web/app",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 1.0
        },
        "quarterly_1": {
          "actual": 0.0
        }
      }
    },
    "NM4-I01.02": {
      "title": "Số lượng cổng game/nền tảng mới phát hành thành công",
      "unit": "Web",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 4.0
        },
        "quarterly_1": {
          "actual": 0.0
        }
      }
    },
    "NM4-I01.03": {
      "title": "Tỷ lệ giữ chân người chơi TB (Retention Rate)",
      "unit": "DAU/MAU",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 0.1
        }
      }
    },
    "NM4-I01.04": {
      "title": "Số lượng cổng game/nền tảng mới phát hành thành công",
      "unit": "Số lượng web blog phát triển kéo traffic về webgame",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 3.0
        }
      }
    },
    "NM4-I01.05": {
      "title": "Số lượng fanpage trên các nền tảng kéo traffic về webgame",
      "unit": "Fanpage",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 4.0
        }
      }
    },
    "NM4-I01.06": {
      "title": "Số lượng traffic & UTM từ web blog và fanpage về web game",
      "unit": "Phiên",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 20000.0
        }
      }
    },
    "NM4-I01.07": {
      "title": "Đảm bảo hệ thống vận hành của nền tảng web game hoạt động ổn định, hiệu suất tốt",
      "unit": "Sự cố",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 0.99
        },
        "quarterly_2": {
          "target": 0.99
        }
      }
    },
    "- Tỷ lệ đảm bảo: ≤ 1 sự cố/tháng\n- Tỷ lệ uptime hệ thống đạt từ 99% trở lên \n-Tốc độ tải trang tốt, đáp ứng lượng truy cập lớn đồng thời": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Tổng số kênh kinh doanh được triển khai",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_6": {
          "target": 16.0
        },
        "monthly_7": {
          "target": 15.0
        },
        "quarterly_1": {
          "actual": 16.0
        },
        "quarterly_2": {
          "target": 18.0
        }
      }
    },
    "Tổng số kênh kinh doanh trong kỳ": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Tổng số kênh kinh doanh được BKT",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_6": {
          "target": 3.0
        },
        "monthly_7": {
          "target": 12.0
        },
        "quarterly_1": {
          "target": 10.0,
          "actual": 10.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 16.0
        }
      }
    },
    "Số kênh mới BKT": {
      "title": "Số kênh đạt ngưỡng 10k $/ tháng",
      "unit": "Số kênh mới BKT",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_7": {
          "target": 0.0
        },
        "quarterly_1": {
          "actual": 0.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt ngưỡng 2k $/ tháng toàn hệ thống",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_7": {
          "target": 1.0
        },
        "quarterly_1": {
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 1.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "NM5-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Ứng dụng nền tảng vận hành AIVA cho hoạt động": {
      "title": "ROI",
      "unit": "Xuất bản và lắng nghe phản hồi",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_6": {
          "target": 5000000.0
        },
        "quarterly_1": {
          "actual": 6765678.0
        },
        "quarterly_2": {
          "target": 21666667.0
        }
      }
    },
    "VM5-I02.04": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất QTK",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_6": {
          "target": 40000000.0
        },
        "quarterly_1": {
          "actual": 54125427.0
        },
        "quarterly_2": {
          "target": 195000000.0
        }
      }
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Số vi phạm chính sách",
      "unit": "Buổi",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "NM6-I03.02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Thúc đẩy văn hóa sáng tạo - kết nối": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo/ sự kiện bonding chung",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Thúc đẩy văn hóa sáng tạo cùng AI": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "NM1-I01.01",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.95
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0
        },
        "monthly_7": {
          "target": 0.95
        },
        "quarterly_1": {
          "target": 0.95
        },
        "quarterly_2": {
          "target": 0.95
        },
        "weekly_1_5": {
          "pct": 0.95
        }
      }
    },
    "Số nhân sự tham gia/ tổng nhân sự đơn vị": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "NM1-I01.01",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.85
        },
        "monthly_6": {
          "actual": 3.0
        },
        "quarterly_1": {
          "target": 0.85
        },
        "quarterly_2": {
          "target": 0.85
        },
        "weekly_1_5": {
          "pct": 0.85
        }
      }
    }
  },
  "CR": {
    "TM1-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM1-I01.01": {
      "title": "ROI",
      "unit": "%",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "VM1-I01.02": {
      "title": "ROI",
      "unit": "ROS",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "TM1-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_6": {
          "target": 112000000.0,
          "pct": 0.5548102679
        },
        "weekly_1_2": {
          "actual": 0.15
        },
        "weekly_2_3": {
          "target": 0.33
        },
        "weekly_7_6": {
          "actual": 100100000.0
        },
        "weekly_8_6": {
          "actual": 182000000.0
        },
        "weekly_9_6": {
          "actual": 365820000.0
        },
        "weekly_10_6": {
          "actual": 453234600.0
        },
        "weekly_11_6": {
          "target": 657190170.0
        }
      }
    },
    "VM1-I02.01": {
      "title": "Tổng doanh thu",
      "unit": "VNĐ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 1476244770.0,
          "pct": 0.0
        },
        "monthly_2": {
          "target": 0.51,
          "actual": 73055860.0,
          "pct": 30981940.0
        },
        "monthly_3": {
          "target": 671301428.0,
          "actual": 176393375.0,
          "pct": 0.26
        },
        "monthly_4": {
          "target": 1046174240.0,
          "actual": 48913831.0,
          "pct": 0.05
        },
        "monthly_5": {
          "target": 1322142432.0,
          "actual": 56040016.0,
          "pct": 0.04
        },
        "monthly_6": {
          "target": 320000000.0,
          "actual": 62138750.0,
          "pct": 0.19
        },
        "monthly_7": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 1410814120.0,
          "actual": 555908278.0,
          "pct": 0.39
        },
        "quarterly_1": {
          "target": 3985176955.0,
          "actual": 167092597.0,
          "pct": 0.04
        },
        "quarterly_2": {
          "target": 282100000.0,
          "pct": 0.0
        },
        "weekly_1_1": {
          "target": 69000000.0,
          "actual": 23229330.0,
          "pct": 0.34
        },
        "weekly_1_2": {
          "target": 70500000.0,
          "actual": 26706280.0,
          "pct": 0.38
        },
        "weekly_1_4": {
          "target": 0.42
        },
        "weekly_1_5": {
          "pct": 429456832.0
        },
        "weekly_1_6": {
          "target": 207802227.0,
          "actual": 0.48,
          "pct": 104864208.0
        },
        "weekly_2_1": {
          "target": 88150850.0,
          "actual": 0.84,
          "pct": 104864208.0
        },
        "weekly_2_2": {
          "target": 24621080.0,
          "actual": 0.23,
          "pct": 104864208.0
        },
        "weekly_2_3": {
          "target": 26896320.0,
          "actual": 0.26,
          "pct": 104864208.0
        },
        "weekly_2_4": {
          "target": 24858080.0
        },
        "weekly_3_1": {
          "target": 160825357.0,
          "actual": 28764119.0,
          "pct": 0.18
        },
        "weekly_3_2": {
          "target": 160825357.0,
          "actual": 29032570.0,
          "pct": 0.18
        },
        "weekly_3_3": {
          "target": 160825357.0,
          "actual": 28135336.0,
          "pct": 0.17
        },
        "weekly_3_4": {
          "target": 160825357.0,
          "actual": 27415950.0,
          "pct": 0.17
        },
        "weekly_4_1": {
          "target": 114297409.0,
          "actual": 3584448.0,
          "pct": 0.03
        },
        "weekly_4_2": {
          "target": 114297409.0,
          "actual": 1747200.0
        },
        "weekly_4_3": {
          "target": 114297409.0,
          "actual": 1866000.0
        },
        "weekly_4_4": {
          "target": 114297409.0,
          "actual": 7806760.0
        },
        "weekly_4_5": {
          "actual": 6553950.0
        },
        "weekly_5_1": {
          "target": 165000000.0,
          "actual": 5628220.0,
          "pct": 0.03
        },
        "weekly_5_2": {
          "target": 165000000.0,
          "actual": 5883800.0,
          "pct": 0.04
        },
        "weekly_5_3": {
          "target": 165000000.0,
          "actual": 5364060.0,
          "pct": 0.03
        },
        "weekly_5_4": {
          "target": 165000000.0,
          "actual": 7898800.0,
          "pct": 0.05
        },
        "weekly_6_1": {
          "target": 80000000.0,
          "actual": 5517200.0,
          "pct": 0.07
        },
        "weekly_6_2": {
          "target": 80000000.0,
          "actual": 6890000.0,
          "pct": 0.09
        },
        "weekly_6_3": {
          "target": 80000000.0,
          "actual": 11692486.0,
          "pct": 0.15
        },
        "weekly_6_4": {
          "target": 80000000.0,
          "actual": 6079814.0
        },
        "weekly_7_1": {
          "target": 0.0
        },
        "weekly_7_2": {
          "target": 0.0
        },
        "weekly_7_3": {
          "target": 0.0
        },
        "weekly_7_4": {
          "target": 0.0
        },
        "weekly_7_5": {
          "target": 0.0
        }
      }
    },
    "NM1-I02.01.02": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu YouTube- nội bộ",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 1476244770.0
        },
        "monthly_2": {
          "target": 0.02,
          "actual": 12055860.0,
          "pct": 183040.0
        },
        "monthly_3": {
          "target": 351301428.0,
          "actual": 186618.0
        },
        "monthly_4": {
          "target": 506174240.0,
          "actual": 12292800.0
        },
        "monthly_5": {
          "target": 662142432.0,
          "actual": 7072000.0
        },
        "monthly_6": {
          "target": 20000000.0,
          "actual": 7074600.0,
          "pct": 0.35
        },
        "yearly_2026": {
          "target": 538814120.0,
          "actual": 1886238.0
        },
        "quarterly_1": {
          "target": 1985176955.0,
          "actual": 26439400.0
        },
        "quarterly_2": {
          "target": 282100000.0
        },
        "weekly_1_1": {
          "target": 8000000.0,
          "actual": 248820.0,
          "pct": 0.03
        },
        "weekly_1_2": {
          "target": 9500000.0,
          "actual": 205400.0,
          "pct": 0.02
        },
        "weekly_1_4": {
          "target": 0.02
        },
        "weekly_1_5": {
          "pct": 147456832.0
        },
        "weekly_1_6": {
          "target": 773240.0,
          "pct": 36864208.0
        },
        "weekly_2_1": {
          "target": 215540.0,
          "actual": 0.01,
          "pct": 36864208.0
        },
        "weekly_2_2": {
          "target": 232700.0,
          "actual": 0.01,
          "pct": 36864208.0
        },
        "weekly_2_3": {
          "target": 177840.0,
          "actual": 0.0,
          "pct": 36864208.0
        },
        "weekly_3_1": {
          "target": 87825357.0,
          "actual": 189020.0,
          "pct": 0.0
        },
        "weekly_3_2": {
          "target": 87825357.0,
          "actual": 115960.0,
          "pct": 0.0
        },
        "weekly_3_3": {
          "target": 87825357.0,
          "actual": 392600.0,
          "pct": 0.0
        },
        "weekly_3_4": {
          "target": 87825357.0,
          "actual": 527800.0,
          "pct": 0.01
        },
        "weekly_3_5": {
          "actual": 769600.0
        },
        "weekly_4_1": {
          "target": 114297409.0,
          "actual": 1981200.0,
          "pct": 0.02
        },
        "weekly_4_2": {
          "target": 114297409.0,
          "actual": 689000.0
        },
        "weekly_4_3": {
          "target": 114297409.0,
          "actual": 514800.0
        },
        "weekly_4_4": {
          "target": 114297409.0,
          "actual": 6008600.0
        },
        "weekly_4_5": {
          "target": 114297409.0,
          "actual": 4412200.0
        },
        "weekly_5_1": {
          "actual": 2493400.0
        },
        "weekly_5_2": {
          "actual": 1801800.0
        },
        "weekly_5_3": {
          "actual": 894400.0
        },
        "weekly_5_4": {
          "actual": 1138800.0
        },
        "weekly_6_1": {
          "target": 5000000.0,
          "actual": 1947400.0,
          "pct": 0.39
        },
        "weekly_6_2": {
          "target": 5000000.0,
          "actual": 1690000.0,
          "pct": 0.34
        },
        "weekly_6_3": {
          "target": 5000000.0,
          "actual": 1482000.0,
          "pct": 0.3
        },
        "weekly_6_4": {
          "target": 5000000.0,
          "actual": 1684800.0
        },
        "weekly_6_5": {
          "target": 5000000.0
        }
      }
    },
    "CM1-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_4": {
          "target": 540000000.0,
          "actual": 7952558.0
        },
        "monthly_5": {
          "target": 660000000.0,
          "actual": 18446480.0
        },
        "monthly_6": {
          "target": 300000000.0,
          "actual": 23375300.0,
          "pct": 0.08
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 2000000000.0,
          "actual": 49774338.0
        },
        "weekly_1_1": {
          "actual": 0.0
        },
        "weekly_1_5": {
          "pct": 0.0
        },
        "weekly_1_6": {
          "target": 60000000.0
        },
        "weekly_2_1": {
          "target": 60000000.0
        },
        "weekly_4_1": {
          "actual": 1603248.0
        },
        "weekly_4_2": {
          "actual": 1058200.0
        },
        "weekly_4_3": {
          "actual": 1351200.0
        },
        "weekly_4_4": {
          "actual": 1798160.0
        },
        "weekly_4_5": {
          "actual": 2141750.0
        },
        "weekly_5_1": {
          "target": 165000000.0,
          "actual": 3134820.0
        },
        "weekly_5_2": {
          "target": 165000000.0,
          "actual": 4082000.0
        },
        "weekly_5_3": {
          "target": 165000000.0,
          "actual": 4469660.0
        },
        "weekly_5_4": {
          "target": 165000000.0,
          "actual": 6760000.0
        },
        "weekly_6_1": {
          "target": 75000000.0,
          "actual": 3569800.0,
          "pct": 0.05
        },
        "weekly_6_2": {
          "target": 75000000.0,
          "actual": 5200000.0,
          "pct": 0.07
        },
        "weekly_6_3": {
          "actual": 10210486.0
        },
        "weekly_6_4": {
          "actual": 4395014.0
        }
      }
    },
    "Doanh thu hợp tác": {
      "title": "Tổng doanh thu",
      "unit": "WOA UNI",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_1": {
          "target": 1650000000.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 660000000.0
        },
        "weekly_1_6": {
          "target": 60000000.0
        },
        "weekly_2_1": {
          "target": 60000000.0
        }
      }
    },
    "Doanh thu từ đối tác IP": {
      "title": "Tổng doanh thu",
      "unit": "CBC",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_1": {
          "target": 3350000000.0
        },
        "yearly_2026": {
          "target": 0.0
        },
        "quarterly_1": {
          "target": 1340000000.0
        }
      }
    },
    "Doanh thu từ đối tác khai thác": {
      "title": "Tổng doanh thu",
      "unit": "Wolfoo",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Doanh thu từ DA phái sinh": {
      "title": "Tổng doanh thu",
      "unit": "Doanh thu Game App",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_1": {
          "target": 3202593750.0
        },
        "monthly_2": {
          "target": 0.59,
          "actual": 61000000.0,
          "pct": 30798900.0
        },
        "monthly_3": {
          "target": 320000000.0,
          "actual": 136106598.0,
          "pct": 0.43
        },
        "yearly_2026": {
          "target": 872000000.0,
          "actual": 383760314.0,
          "pct": 0.44
        },
        "weekly_1_1": {
          "target": 61000000.0,
          "actual": 22980510.0,
          "pct": 0.38
        },
        "weekly_1_2": {
          "target": 61000000.0,
          "actual": 26500880.0,
          "pct": 0.43
        },
        "weekly_1_4": {
          "target": 0.5
        },
        "weekly_1_5": {
          "pct": 272000000.0
        },
        "weekly_1_6": {
          "target": 111494411.0,
          "actual": 0.41,
          "pct": 68000000.0
        },
        "weekly_2_1": {
          "target": 27935310.0,
          "actual": 0.41,
          "pct": 68000000.0
        },
        "weekly_2_2": {
          "target": 24388380.0,
          "actual": 0.36,
          "pct": 68000000.0
        },
        "weekly_2_3": {
          "target": 26718480.0,
          "actual": 0.39,
          "pct": 68000000.0
        },
        "weekly_2_4": {
          "target": 24858080.0,
          "actual": 0.37
        },
        "weekly_3_1": {
          "target": 73000000.0,
          "actual": 28575099.0,
          "pct": 0.39
        },
        "weekly_3_2": {
          "target": 73000000.0,
          "actual": 28916610.0,
          "pct": 0.4
        },
        "weekly_3_3": {
          "target": 73000000.0,
          "actual": 27742736.0,
          "pct": 0.38
        },
        "weekly_3_4": {
          "target": 73000000.0,
          "actual": 26888150.0,
          "pct": 0.37
        },
        "weekly_3_5": {
          "target": 28000000.0
        }
      }
    },
    "Tổng doanh thu mảng Game phát sinh trong kỳ đánh giá": {
      "title": "Tổng doanh thu",
      "unit": "IP Owner",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "actual": 40100159.0
        },
        "monthly_4": {
          "actual": 32934509.0
        },
        "monthly_5": {
          "actual": 35764399.0
        },
        "monthly_6": {
          "actual": 31688850.0
        },
        "quarterly_1": {
          "actual": 100387758.0
        },
        "weekly_1_6": {
          "target": 34604652.0
        }
      }
    },
    "TM1-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {
        "monthly_3": {
          "target": 30.0
        }
      }
    },
    "VM1-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ sử dụng ngân sách",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "TM1-I05": {
      "title": "",
      "unit": "CM1-I03.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM1-I05.03": {
      "title": "Tổng doanh thu",
      "unit": "5",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 25000000.0
        },
        "yearly_2026": {
          "target": 25000000.0
        },
        "quarterly_1": {
          "target": 25000000.0
        },
        "quarterly_2": {
          "target": 25000000.0
        }
      }
    },
    "VM1-I05.04": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí CTV (Cộng tác viên)",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 0.0
        },
        "quarterly_2": {
          "target": 0.0
        }
      }
    },
    "M2": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM2-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM2-I01.01": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "VM2-I01.01",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 135.0
        },
        "monthly_2": {
          "target": 0.85,
          "actual": 1715.0,
          "pct": 1527.0
        },
        "monthly_3": {
          "target": 201.0,
          "actual": 201.0,
          "pct": 1.0
        },
        "monthly_4": {
          "target": 55.0,
          "actual": 46.0
        },
        "monthly_5": {
          "target": 80.0,
          "actual": 79.0,
          "pct": 0.99
        },
        "monthly_6": {
          "target": 60.0,
          "actual": 53.0,
          "pct": 0.88
        },
        "monthly_7": {
          "target": 175.0
        },
        "yearly_2026": {
          "target": 6377.0,
          "actual": 7616.0,
          "pct": 1.194
        },
        "quarterly_1": {
          "target": 165.0,
          "actual": 165.0,
          "pct": 1.0
        },
        "quarterly_2": {
          "target": 135.0
        },
        "weekly_1_1": {
          "target": 1209.0,
          "actual": 2006.0,
          "pct": 1.66
        },
        "weekly_1_2": {
          "target": 1512.0,
          "actual": 2389.0,
          "pct": 1.58
        },
        "weekly_1_4": {
          "target": 0.89
        },
        "weekly_1_5": {
          "pct": 76.0
        },
        "weekly_1_6": {
          "target": 76.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 18.0
        },
        "weekly_2_2": {
          "target": 18.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 55.0
        },
        "weekly_2_4": {
          "target": 55.0
        },
        "weekly_3_1": {
          "target": 50.0,
          "actual": 44.0,
          "pct": 0.88
        },
        "weekly_3_2": {
          "target": 51.0,
          "actual": 65.0,
          "pct": 1.27
        },
        "weekly_3_3": {
          "target": 51.0,
          "actual": 44.0,
          "pct": 0.86
        },
        "weekly_3_4": {
          "target": 51.0,
          "actual": 24.0,
          "pct": 0.47
        },
        "weekly_3_5": {
          "target": 5.0,
          "actual": 24.0
        },
        "weekly_4_1": {
          "target": 11.0,
          "actual": 11.0
        },
        "weekly_4_2": {
          "target": 11.0,
          "actual": 9.0
        },
        "weekly_4_3": {
          "target": 13.0,
          "actual": 12.0
        },
        "weekly_4_4": {
          "target": 12.0,
          "actual": 10.0
        },
        "weekly_4_5": {
          "target": 8.0,
          "actual": 4.0
        },
        "weekly_5_1": {
          "target": 20.0,
          "actual": 22.0,
          "pct": 1.1
        },
        "weekly_5_2": {
          "target": 20.0,
          "actual": 23.0,
          "pct": 1.15
        },
        "weekly_5_3": {
          "target": 20.0,
          "actual": 17.0,
          "pct": 0.85
        },
        "weekly_5_4": {
          "target": 20.0,
          "actual": 17.0,
          "pct": 0.85
        },
        "weekly_6_1": {
          "target": 10.0,
          "actual": 11.0,
          "pct": 1.1
        },
        "weekly_6_2": {
          "target": 15.0,
          "actual": 18.0,
          "pct": 1.2
        },
        "weekly_6_3": {
          "target": 15.0,
          "actual": 11.0,
          "pct": 0.73
        },
        "weekly_6_4": {
          "target": 15.0,
          "actual": 13.0
        },
        "weekly_7_1": {
          "target": 5.0,
          "actual": 7.0,
          "pct": 1.4
        },
        "weekly_7_2": {
          "target": 10.0,
          "actual": 15.0,
          "pct": 1.5
        },
        "weekly_7_3": {
          "target": 12.0,
          "actual": 19.0,
          "pct": 1.583
        },
        "weekly_7_4": {
          "target": 10.0
        },
        "weekly_7_5": {
          "target": 12.0
        },
        "weekly_7_6": {
          "actual": 175.0
        }
      }
    },
    "CM2-I01.01": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Số lượng video long",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 90.0
        },
        "monthly_2": {
          "target": 0.21,
          "actual": 15.0,
          "pct": 4.0
        },
        "monthly_3": {
          "target": 20.0,
          "actual": 38.0,
          "pct": 1.9
        },
        "monthly_4": {
          "target": 55.0,
          "actual": 46.0
        },
        "monthly_5": {
          "target": 80.0,
          "actual": 79.0
        },
        "monthly_6": {
          "target": 60.0,
          "actual": 58.0,
          "pct": 0.97
        },
        "yearly_2026": {
          "target": 84.0,
          "actual": 79.0,
          "pct": 0.94
        },
        "quarterly_1": {
          "target": 165.0,
          "actual": 165.0
        },
        "quarterly_2": {
          "target": 90.0
        },
        "weekly_1_1": {
          "target": 9.0,
          "actual": 9.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 12.0,
          "actual": 11.0,
          "pct": 0.92
        },
        "weekly_1_4": {
          "target": 0.27
        },
        "weekly_1_5": {
          "pct": 14.0
        },
        "weekly_1_6": {
          "target": 14.0,
          "actual": 1.0,
          "pct": 3.0
        },
        "weekly_2_1": {
          "target": 3.0,
          "actual": 1.0,
          "pct": 4.0
        },
        "weekly_2_2": {
          "target": 4.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 7.0
        },
        "weekly_2_4": {
          "target": 7.0
        },
        "weekly_3_1": {
          "target": 5.0,
          "actual": 4.0,
          "pct": 0.8
        },
        "weekly_3_2": {
          "target": 5.0,
          "actual": 9.0,
          "pct": 1.8
        },
        "weekly_3_3": {
          "target": 5.0,
          "actual": 13.0,
          "pct": 2.6
        },
        "weekly_3_4": {
          "target": 5.0,
          "actual": 10.0,
          "pct": 2.0
        },
        "weekly_3_5": {
          "target": 2.0,
          "actual": 2.0
        },
        "weekly_4_1": {
          "target": 11.0,
          "actual": 11.0,
          "pct": 1.0
        },
        "weekly_4_2": {
          "target": 11.0,
          "actual": 9.0,
          "pct": 0.82
        },
        "weekly_4_3": {
          "target": 13.0,
          "actual": 12.0,
          "pct": 0.92
        },
        "weekly_4_4": {
          "target": 12.0,
          "actual": 10.0,
          "pct": 0.83
        },
        "weekly_4_5": {
          "target": 8.0,
          "actual": 4.0,
          "pct": 0.5
        },
        "weekly_5_1": {
          "target": 20.0,
          "actual": 22.0,
          "pct": 1.1
        },
        "weekly_5_2": {
          "target": 20.0,
          "actual": 23.0,
          "pct": 1.15
        },
        "weekly_5_3": {
          "target": 20.0,
          "actual": 17.0
        },
        "weekly_5_4": {
          "target": 20.0,
          "actual": 17.0
        },
        "weekly_6_1": {
          "target": 10.0,
          "actual": 11.0,
          "pct": 1.1
        },
        "weekly_6_2": {
          "target": 15.0,
          "actual": 18.0
        },
        "weekly_6_3": {
          "target": 15.0,
          "actual": 11.0
        },
        "weekly_6_4": {
          "target": 15.0,
          "actual": 13.0
        },
        "weekly_6_5": {
          "target": 5.0,
          "actual": 5.0
        }
      }
    },
    "Số lượng video thời lượng 5 phút": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Số lượng video short/shot",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 45.0
        },
        "monthly_2": {
          "target": 0.86,
          "actual": 1700.0,
          "pct": 1523.0
        },
        "monthly_3": {
          "target": 181.0,
          "actual": 163.0,
          "pct": 0.9
        },
        "monthly_4": {
          "target": 0.0
        },
        "yearly_2026": {
          "target": 6293.0,
          "actual": 7537.0,
          "pct": 1.198
        },
        "quarterly_1": {
          "target": 0.0
        },
        "quarterly_2": {
          "target": 45.0
        },
        "weekly_1_1": {
          "target": 1200.0,
          "actual": 1997.0,
          "pct": 1.66
        },
        "weekly_1_2": {
          "target": 1500.0,
          "actual": 2378.0,
          "pct": 1.59
        },
        "weekly_1_4": {
          "target": 0.9
        },
        "weekly_1_5": {
          "pct": 62.0
        },
        "weekly_1_6": {
          "target": 62.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_1": {
          "target": 0.0,
          "pct": 14.0
        },
        "weekly_2_2": {
          "target": 14.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 48.0
        },
        "weekly_2_4": {
          "target": 48.0
        },
        "weekly_3_1": {
          "target": 45.0,
          "actual": 40.0,
          "pct": 0.88
        },
        "weekly_3_2": {
          "target": 46.0,
          "actual": 56.0,
          "pct": 1.22
        },
        "weekly_3_3": {
          "target": 46.0,
          "actual": 31.0,
          "pct": 0.67
        },
        "weekly_3_4": {
          "target": 46.0,
          "actual": 14.0,
          "pct": 0.3
        },
        "weekly_3_5": {
          "target": 3.0,
          "actual": 22.0
        }
      }
    },
    "Số lượng video thời lượng <1 phút": {
      "title": "SL video đạt ngưỡng 1 triệu views (youtube long)",
      "unit": "Video",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 10.0
        },
        "monthly_5": {
          "target": 0.0,
          "actual": 0.0
        },
        "monthly_6": {
          "target": 0.0,
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 50.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 200.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "quarterly_2": {
          "target": 5.0
        }
      }
    },
    "CM2-I01.02": {
      "title": "Số vi phạm chính sách",
      "unit": "Số bộ IP hoàn thành",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 70.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 10.0,
          "actual": 0.0
        }
      }
    },
    "CM2-I01.03": {
      "title": "Số vi phạm chính sách",
      "unit": "CM2-I01.03",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "target": 1.0,
          "actual": 3.0,
          "pct": 2.0
        },
        "monthly_3": {
          "target": 3.0,
          "actual": 3.0,
          "pct": 1.0
        },
        "yearly_2026": {
          "target": 25.0,
          "actual": 16.0,
          "pct": 0.64
        },
        "weekly_1_1": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        },
        "weekly_1_4": {
          "target": 0.67
        },
        "weekly_1_5": {
          "pct": 5.0
        },
        "weekly_1_6": {
          "target": 5.0,
          "actual": 1.0,
          "pct": 2.0
        },
        "weekly_2_1": {
          "target": 2.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_2_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 0.0
        },
        "weekly_2_3": {
          "target": 0.0,
          "pct": 2.0
        },
        "weekly_2_4": {
          "target": 2.0
        },
        "weekly_3_1": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_2": {
          "target": 1.0,
          "actual": 1.0,
          "pct": 1.0
        },
        "weekly_3_3": {
          "target": 0.0
        },
        "weekly_3_4": {
          "target": 1.0
        }
      }
    },
    "M3": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM3-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Số Game phát triển mới/update": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube SCS",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_1": {
          "target": 42024160.0
        },
        "monthly_2": {
          "target": 0.29,
          "actual": 8005002.0,
          "pct": 3387089.0
        },
        "monthly_3": {
          "target": 11000000.0,
          "actual": 7966303.0,
          "pct": 0.72
        },
        "monthly_4": {
          "target": 15000000.0,
          "actual": 7483470.0,
          "pct": 0.5
        },
        "monthly_5": {
          "target": 8000000.0,
          "actual": 1894293.0,
          "pct": 0.24
        },
        "monthly_6": {
          "target": 3000000.0,
          "actual": 1135516.0,
          "pct": 0.38
        },
        "monthly_7": {
          "target": 1510000.0
        },
        "yearly_2026": {
          "target": 147997005.0,
          "actual": 48188635.0,
          "pct": 0.326
        },
        "quarterly_1": {
          "target": 60000000.0,
          "actual": 10513279.0,
          "pct": 0.1752
        },
        "quarterly_2": {
          "target": 7928497.0
        },
        "weekly_1_1": {
          "target": 7000000.0,
          "actual": 4700833.0,
          "pct": 0.67
        },
        "weekly_1_2": {
          "target": 7500000.0,
          "actual": 5233647.0,
          "pct": 0.7
        },
        "weekly_1_4": {
          "target": 0.42
        },
        "weekly_1_5": {
          "pct": 49327302.0
        },
        "weekly_1_6": {
          "target": 23885004.0,
          "actual": 0.48,
          "pct": 12331826.0
        },
        "weekly_2_1": {
          "target": 5331602.0,
          "actual": 0.43,
          "pct": 12331826.0
        },
        "weekly_2_2": {
          "target": 11899954.0,
          "actual": 0.96,
          "pct": 12331826.0
        },
        "weekly_2_3": {
          "target": 3667611.0,
          "actual": 0.3,
          "pct": 12331826.0
        },
        "weekly_3_1": {
          "target": 17091176.0,
          "actual": 2798207.0,
          "pct": 0.16
        },
        "weekly_3_2": {
          "target": 17091176.0,
          "actual": 1599455.0,
          "pct": 0.09
        },
        "weekly_3_3": {
          "target": 3000000.0,
          "actual": 1239189.0,
          "pct": 0.41
        },
        "weekly_3_4": {
          "target": 3000000.0,
          "actual": 1639260.0,
          "pct": 0.55
        },
        "weekly_3_5": {
          "target": 3000000.0,
          "actual": 429061.0
        },
        "weekly_4_1": {
          "target": 3387097.0,
          "actual": 588209.0,
          "pct": 0.17
        },
        "weekly_4_2": {
          "target": 3387097.0,
          "actual": 820038.0,
          "pct": 0.24
        },
        "weekly_4_3": {
          "target": 3387097.0,
          "actual": 1406251.0,
          "pct": 0.42
        },
        "weekly_4_4": {
          "target": 3387097.0,
          "actual": 1938169.0,
          "pct": 0.57
        },
        "weekly_4_5": {
          "target": 3387097.0,
          "actual": 1078487.0
        },
        "weekly_5_1": {
          "target": 2000000.0,
          "actual": 570605.0,
          "pct": 0.29
        },
        "weekly_5_2": {
          "target": 2000000.0,
          "actual": 607453.0,
          "pct": 0.3
        },
        "weekly_5_3": {
          "actual": 371535.0
        },
        "weekly_5_4": {
          "actual": 178228.0
        },
        "weekly_6_1": {
          "target": 750000.0,
          "actual": 331640.0,
          "pct": 0.44
        },
        "weekly_6_2": {
          "target": 700000.0,
          "actual": 347997.0
        },
        "weekly_6_3": {
          "target": 750000.0,
          "actual": 223815.0
        },
        "weekly_6_4": {
          "target": 800000.0,
          "actual": 217639.0
        },
        "weekly_7_1": {
          "target": 10000.0,
          "actual": 0.0,
          "pct": 0.0
        },
        "weekly_7_2": {
          "target": 100000.0,
          "actual": 5083.0,
          "pct": 0.051
        },
        "weekly_7_3": {
          "target": 250000.0,
          "actual": 23843.0,
          "pct": 0.095
        },
        "weekly_7_4": {
          "target": 500000.0
        },
        "weekly_7_5": {
          "target": 650000.0
        },
        "weekly_7_6": {
          "actual": 2208863.0
        },
        "weekly_8_6": {
          "actual": 4209634.0
        },
        "weekly_9_6": {
          "actual": 8447268.0
        },
        "weekly_10_6": {
          "actual": 10468733.0
        },
        "weekly_11_6": {
          "target": 15179662.0
        }
      }
    },
    "Số lượt view youtube SCCH": {
      "title": "Số lượt view youtube SCVN",
      "unit": "Số lượt view youtube shorts",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "TM3-I01.05": {
      "title": "Số lượt cài đặt game/app",
      "unit": "TM3-I01.05",
      "formula": "",
      "pic": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "periods": {
        "monthly_1": {
          "target": 3000000.0
        },
        "monthly_2": {
          "target": 2.45,
          "actual": 150000.0,
          "pct": 239756.0
        },
        "monthly_3": {
          "target": 700000.0,
          "actual": 647759.0,
          "pct": 0.93
        },
        "yearly_2026": {
          "target": 2000000.0,
          "actual": 2487078.0,
          "pct": 1.244
        },
        "weekly_1_1": {
          "target": 150000.0,
          "actual": 206069.0,
          "pct": 1.37
        },
        "weekly_1_2": {
          "target": 150000.0,
          "actual": 253423.0,
          "pct": 1.69
        },
        "weekly_1_4": {
          "target": 1.6
        },
        "weekly_1_5": {
          "pct": 700000.0
        },
        "weekly_1_6": {
          "target": 640644.0,
          "actual": 0.92,
          "pct": 175000.0
        },
        "weekly_2_1": {
          "target": 204426.0,
          "actual": 1.17,
          "pct": 175000.0
        },
        "weekly_2_2": {
          "target": 146001.0,
          "actual": 0.83,
          "pct": 175000.0
        },
        "weekly_2_3": {
          "target": 160611.0,
          "actual": 0.92,
          "pct": 175000.0
        },
        "weekly_2_4": {
          "target": 134876.0,
          "actual": 0.77
        },
        "weekly_3_1": {
          "target": 175000.0,
          "actual": 138968.0,
          "pct": 0.79
        },
        "weekly_3_2": {
          "target": 175000.0,
          "actual": 136669.0,
          "pct": 0.78
        },
        "weekly_3_3": {
          "target": 175000.0,
          "actual": 155719.0,
          "pct": 0.89
        },
        "weekly_3_4": {
          "target": 175000.0,
          "actual": 146353.0,
          "pct": 0.84
        }
      }
    },
    "Số lượng view trên nền tảng youtube nd short": {
      "title": "Số vi phạm chính sách",
      "unit": "Số đối tác hợp tác",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM3-I01.06": {
      "title": "Số lượt view youtube SCVN",
      "unit": "View TB/1 nội dung mới upload trong kỳ",
      "formula": "",
      "pic": "Ngày",
      "periods": {}
    },
    "M4": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "Phát triển hệ thống kênh kinh doanh": {
      "title": "Số vi phạm chính sách",
      "unit": "Kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_1": {
          "target": 0.0
        },
        "weekly_1_2": {
          "target": 0.0
        }
      }
    },
    "TM4-I02.02": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh đạt các ngưỡng mới hoặc đạt huy hiệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "actual": 0.0
        },
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "weekly_1_1": {
          "target": 0.0
        },
        "weekly_1_2": {
          "target": 0.0
        }
      }
    },
    "TM4-I04.01": {
      "title": "Số vi phạm chính sách",
      "unit": "TM4-I04.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 10.0,
          "actual": 0.0,
          "pct": 0.0
        }
      }
    },
    "VM4-I02.04": {
      "title": "Số vi phạm chính sách",
      "unit": "SL",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.05": {
      "title": "Số vi phạm chính sách",
      "unit": "Tổng số kênh kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM4-I02.06": {
      "title": "Số vi phạm chính sách",
      "unit": "Số kênh BKT",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 7.0
        },
        "quarterly_2": {
          "target": 3.0
        }
      }
    },
    "M5": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM5-I01.03": {
      "title": "Chuẩn hóa tài liệu vận hành theo mô hình mới",
      "unit": "Tài liệu",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_1": {
          "target": 2.0
        },
        "yearly_2026": {
          "target": 3.0,
          "actual": 0.0
        },
        "quarterly_1": {
          "target": 2.0,
          "actual": 0.0
        },
        "quarterly_2": {
          "target": 2.0
        }
      }
    },
    "Số lượng IP được đăng ký bảo hộ": {
      "title": "ROI",
      "unit": "",
      "formula": "",
      "pic": "PTGĐ Ly",
      "periods": {}
    },
    "Hoàn chỉnh khung năng lực về đánh giá tính hiệu quả sử dụng AI.": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.01": {
      "title": "Tổng doanh thu phát sinh trong kỳ đánh giá",
      "unit": "VM5-I02.01",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.02": {
      "title": "Hiệu suất sản xuất",
      "unit": "Quản trị hiệu suất",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.03": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu kênh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh đạt ngưỡng X$/ tháng": {
      "title": "Tổng doanh thu",
      "unit": "Hiệu suất doanh thu/người",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Số kênh kinh doanh không hiệu quả bị trả lại trong kỳ": {
      "title": "Tổng doanh thu",
      "unit": "Chi phí sx TB/1 SP",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.05": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "Chuyển đổi số AI": {
      "title": "Số vi phạm chính sách",
      "unit": "Đầu mục công việc số hóa",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "VM5-I02.07": {
      "title": "ROI",
      "unit": "VM5-I02.06.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {}
    },
    "M6": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I01.01": {
      "title": "Tỷ lệ nhân sự vận hành quy trình sáng tạo và sản xuất  bằng AIVA",
      "unit": "Buổi",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_2": {
          "target": 1.0
        },
        "yearly_2026": {
          "target": 6.0,
          "actual": 8.0
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 2.0,
          "pct": 2.0
        },
        "weekly_1_2": {
          "target": 2.0,
          "actual": 2.0,
          "pct": 1.0
        }
      }
    },
    "TM6-I01.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia đào tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.9
        },
        "weekly_1_1": {
          "target": 1.0,
          "actual": 1.0
        }
      }
    },
    "TM6-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM6-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được đánh giá giá năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.5
        }
      }
    },
    "TM6-I03.02": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự được nâng cấp năng lực",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.2
        }
      }
    },
    "M7": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "TM7-I01": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I01.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự đạt hiệu suất cao sản xuất/kinh doanh",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.3
        }
      }
    },
    "TM7-I02": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I02.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự tham gia các sự kiện sáng tạo",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 0.9
        }
      }
    },
    "VM7-I02.02": {
      "title": "Số các đề xuất sáng tạo được ghi nhận",
      "unit": "VM7-I02.02",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "yearly_2026": {
          "target": 1.0
        }
      }
    },
    "TM7-I03": {
      "title": "",
      "unit": "",
      "formula": "",
      "pic": "",
      "periods": {}
    },
    "VM7-I03.01": {
      "title": "ROI",
      "unit": "Tỷ lệ nhân sự không vi phạm kỷ luật",
      "formula": "",
      "pic": "Ngày",
      "periods": {
        "monthly_3": {
          "target": 0.95
        },
        "monthly_6": {
          "target": 0.95,
          "actual": 1.0,
          "pct": 1.0
        },
        "monthly_7": {
          "target": 0.95
        },
        "yearly_2026": {
          "target": 0.9
        },
        "quarterly_1": {
          "actual": 0.95
        }
      }
    },
    "VM7-I03.02": {
      "title": "Số vi phạm tuân thủ",
      "unit": "Lần",
      "formula": "",
      "pic": "Quỹ IP",
      "periods": {
        "monthly_6": {
          "actual": 1.0
        }
      }
    }
  }
};

export function getMasterKpiRecord(unitCode: string, kpiCode: string, periodKey: string): PeriodKpiVal | null {
  const u = MASTER_KPI_DATA[unitCode] || MASTER_KPI_DATA["SCVN"];
  if (!u) return null;
  let item = u[kpiCode];
  if (!item && (kpiCode === "VM1-I02.01" || kpiCode === "M1-I02")) {
    item = u["2.1"] || Object.values(u).find(v => v.title && (v.title.toUpperCase().includes("TỔNG DOANH THU") || (v.title.toUpperCase().includes("DOANH THU") && !v.title.toUpperCase().includes("NỘI BỘ"))));
  }
  if (!item || !item.periods) return null;
  return item.periods[periodKey] || null;
}

export function getMasterKpiActual(unitCode: string, kpiCode: string, periodKey: string): number | null {
  const rec = getMasterKpiRecord(unitCode, kpiCode, periodKey);
  return rec?.actual ?? rec?.target ?? null;
}
