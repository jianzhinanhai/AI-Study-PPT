const decisions = {
      delivery:{title:'Activity Fee｜活动型固定服务费',desc:'适用于完成售前评估、POC、部署、采用或迁移等明确 engagement。',trigger:'正确 offer + size + market；客户 consent；按期交付；POE 审核通过。',evidence:'Customer attestation、partner survey、invoice / CSR、专项交付和绩效数据。',finance:'固定金额收入，但必须扣除交付、售前、第三方和证据管理成本。'},
      conversion:{title:'Conversion Bonus｜竞争替换追加奖金',desc:'适用于前置 Deployment 已获批，并能证明竞争产品被 Microsoft 产品替换。',trigger:'同一 partner、同尺码前置部署；POE 批准至少 30 天；竞争产品减少达到门槛。',evidence:'Before / after dashboard、客户来源、竞争产品活跃使用与 Microsoft 替代使用证据。',finance:'只在替换真实且证据可取得时进入 forecast；否则视为 upside。'},
      transaction:{title:'CSP Rebate / Growth｜交易、消费与增长返点',desc:'适用于合格 billed revenue、Azure consumed revenue 或 tenant / solution area 月度同比净增长。',trigger:'TPOR / 授权有效；产品和交易合格；无 COCP；不超过 lever cap。',evidence:'主要依赖系统交易、消费和关联记录，仍受合规、资格及审计。',finance:'常规 CSP 多为 60% rebate / 40% co-op；Co-op 不能与现金返点重复计入。'},
      expense:{title:'Co-op｜合格活动费用报销',desc:'适用于下一使用期内实际发生的合格营销、培训、采用、活动或专职资源费用。',trigger:'已赚取 available fund；在使用期内发生费用；符合类别和市场费率上限。',evidence:'第三方发票优先；无发票时 CSR + 替代 POE；活动后 45 天内 claim。',finance:'按实际成本、类别 cap、市场费率 cap、余额四项取低，未用资金作废。'},
      advisor:{title:'Biz Apps Advisor / Enterprise',desc:'适用于 D365 售前影响、HWM 以上净新增席位，或 EA/EAS 等企业协议合格交易与 ACR。',trigger:'CPOR / TPOR 正确；适用协议与 workload；满足 seat HWM 或 eligible revenue / ACR。',evidence:'Biz Apps 需售前 POE；Enterprise 以交易系统为主，部分场景需审计材料。',finance:'Biz Apps = 新增单位 × rate card；Enterprise = eligible revenue × lever + accelerator。'}
    };

    function renderDecision(key){
      const d=decisions[key];
      document.getElementById('decisionOutput').innerHTML=`<div class="tag blue">Recommended wallet</div><h3>${d.title}</h3><p>${d.desc}</p><div class="decision-columns"><div class="decision-box"><b>触发逻辑</b><div>${d.trigger}</div></div><div class="decision-box"><b>核心证据</b><div>${d.evidence}</div></div><div class="decision-box"><b>财务口径</b><div>${d.finance}</div></div></div>`;
    }
