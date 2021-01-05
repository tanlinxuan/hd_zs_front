/**
 *  项目内字典定义
 * @author 谭邻宣
 * @date 2020/9/28 10:00
 **/

const DICT = {
    //状态1  page: 用户管理
    status1: {
        'USABLE': '启用',
        'DISABLE': '禁用'
    },
    //状态2 page: 变更类型  ，7+4  ,风险管理 ，街道管理
    status2: {
        "EFFECTIVE": "正常",
        "INVALID": "弃用"
    },
    //状态3   page: 街道管理
    status3: {
        "YES": "是",
        "NO": "否"
    },
    //处理策略  page: 风险管理
    strategy: {
        "RECTIFY": "整改",
        "ADVISE": "劝告",
        "MONITOR": "持续监控",
        "TRANSFER": "移交线索"
    },
    //监控状态   page: 监管企业
    monitorStatus: {
        "MONITORING": "监控中",
        "REMOVED": "被移除",
        "STOP": "停止",
    },
    //运营状态   page: 监管企业
    operateStatus: {
        "TRADE": "在营",
        "CANCEL": "注销",
        "RENEW": "续存"
    },
    //提醒状态   page: 工商变更
    remindStatus: {
        "NOMORE": "不再提醒",
        "REMIND": "提醒中",
        "DELAY": "延时提醒"
    },
    //变更状态   page: 工商变更
    changeStatus: {
        "CHANGED": "有变更",
        "NONE": "无变更"
    },
    //管理公司 page：详情页的管理公司
    manageComapny: {
        'report_date': "报告期",
        'fund_issuance': '基金发行情况',
        'fund_count_in': '其中：市内发行基金数量',
        'fund_capital_in': '其中：市内发行基金金额',
        'fund_count_out': '其中：市外发行基金数量',
        'fund_capital_out': '其中：市外发行基金金额',
        'fund_capital_out_same': '其中：市外基金金额同比',
        'fund_capital_out_circle': '其中：市外基金金额环比',
        'fund_capital_in_same': '其中：市内基金金额同比',
        'fund_capital_in_circle': '其中：市内基金金额环比',
        'fund_count_out_same': '其中：市外基金数量同比',
        'fund_count_out_circle': '其中：市外基金数量环比',
        'fund_count_in_same': '其中：市内基金数量同比',
        'fund_count_in_circle': '其中：市内基金数量环比',
        'rcord_situation': '备案情况',
        'financing_keep_record': '其中：在金融办备案数量',
        'association_keep_record': '其中：在中基协备案数量',
        'fund_keep_same': '其中：金融备案数同比',
        'fund_keep_circle': '其中：金融备案数环比',
        'fund_association_keep_same': '其中：中基协备案数同比',
        'fund_association_keep_circle': '其中：中基协备案数环比',
        'capital_situation': '资本情况',
        'register_capital': '其中：注册资本',
        'paid_capital': '其中：实收资本',
        'assets': '其中：资产总额',
        'register_capital_same': '其中：注册资本同比',
        'register_capital_circle': '其中：注册资本环比',
        'paid_capital_same': '其中：实收资本同比',
        'paid_capital_circle': '其中：实收资本同比环比',
        'assets_same': '其中：资产同比',
        'assets_circle': '其中：资产环比',
        'shareholders_situation': '股东情况',
        'organization_count': '其中：企业股东数量',
        'organization_capital': '其中：企业股东金额',
        'natural_person_count': '其中：自然人股东数量',
        'natural_person_capital': '其中：自然人股东金额',
        'company_count_same': '其中：管理公司数量同比',
        'company_count_circle': '其中：管理公司数量环比',
        'contract_name': '公司办公室地址'
    },
    //小贷业务 page：详情页的小贷业务
    loanIndustry: {
        'report_date': "报告期",
        'basic': '基金情况',
        'assets': '资产总额',
        'debt': '负债总额',
        'monetary_capital': '货币资金',
        'risk_reserve': '风险准备金余额',
        'accumulate_amount': '当年累积运营收入',
        'interest_amount': '其中：当年累积利息收入',
        'added_tax': '增值税（实缴入库）',
        'income_tax': '企业所得税（实缴入库）',
        'profit': '净利润',
        'manage': '经营类指标（不含委托贷款）',
        'accumulation_loan': '成立以来累积发放贷款额',
        'year_accumulation_loan': '当年发放贷款额',
        'year_loan_count': '当年发放贷款户数',
        'loan_balance': '贷款余额',
        'non_performing_loan': '不良贷款余额',
        'loan_balance_top': '前10大客户贷款余额',
        'estate_loan_balance': '房地产,建筑相关行业贷款余额',
        'financing_balance_in': '表内融资余额',
        'bank_loans': '其中：银行贷款余额',
        'shareholder_loans': '其中：股东借款余额',
        'peers_loans': '其中：同业拆借余额（拆入）',
        'financing_balance_out': '表外融资余额',
        'entrust_loan': '甲类委托贷款余额',
        'assets_circle': '资产总额环比',
        'assets_same': '资产总额同比',
        'debt_circle': '负债总额环比',
        'debt_same': '负债总额同比',
        'monetary_capital_circle': '货币资金环比',
        'monetary_capital_same': '货币资金同比',
        'risk_reserve_circle': '风险准备金环比',
        'risk_reserve_same': '风险准备金同比',
        'accumulate_amount_circle': '当年累计营运收入环比',
        'accumulate_amount_same': '当年累计营运收入同比',
        'interest_amount_circle': '其中：当年累计贷款利息收入环比',
        'interest_amount_same': '其中：当年累计贷款利息收入同比',
        'added_tax_circle': '增值税（实缴入库）环比',
        'added_tax_same': '增值税（实缴入库）同比',
        'income_tax_circle': '企业所得税（实缴入库）环比',
        'income_tax_same': '企业所得税（实缴入库）同比',
        'profit_circle': '净利润环比',
        'profit_same': '净利润同比',
        'accumulation_loan_circle': '成立以来累积放贷额环比',
        'accumulation_loan_same': '成立以来累积放贷额同比',
        'year_accumulation_loan_circle': '当年累计发放贷款额环比',
        'year_accumulation_loan_same': '当年累计发放贷款额同比',
        'year_loan_count_circle': '当年累计发放贷款户数环比',
        'year_loan_count_same': '当年累计发放贷款户数同比',
        'loan_balance_circle': '贷款余额环比',
        'loan_balance_same': '贷款余额同比',
        'non_performing_loan_circle': '不良贷款余额环比',
        'non_performing_loan_same': '不良贷款余额同比',
        'loan_balance_top_circle': '前十大客户贷款余额环比',
        'loan_balance_top_same': '前十大客户贷款余额同比',
        'estate_loan_balance_circle': '房地产、建筑相关行业贷款余额环比',
        'estate_loan_balance_same': '房地产、建筑相关行业贷款余额同比',
        'financing_balance_in_circle': '表内融资余额环比',
        'financing_balance_in_same': '表内融资余额同比',
        'bank_loans_circle': '其中：银行贷款余额环比',
        'bank_loans_same': '其中：银行贷款余额同比',
        'shareholder_loans_circle': '其中：股东借款余额环比',
        'shareholder_loans_same': '其中：股东借款余额同比',
        'peers_loans_circle': '其中：同业拆借余额（拆入）环比',
        'peers_loans_same': '其中：同业拆借余额（拆入）同比',
        'financing_balance_out_circle': '表外融资余额环比',
        'financing_balance_out_same': '表外融资余额同比',
        'entrust_loan_circle': '甲类委托贷款余额环比',
        'entrust_loan_same': '甲类委托贷款余额同比'
    }
}
module.exports = DICT