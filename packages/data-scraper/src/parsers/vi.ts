import cheerioModule = require('cheerio');
import {IPlan, IProvider} from '../types';

export const ideaParser = (html: string, provider: IProvider) => {
  const plans: IPlan[] = [];
  const ch = cheerioModule.load(html);
  const container = ch('#plan-accordion');
  const allCards = container.find('.card');
  allCards.map((index, card) => {
    const childPlans = ch(card).find('.card-body');
    const bundleTitle = ch(card).find('h5').text().trim();
    childPlans.map((m, row) => {
      const rows = ch(row).find('.pkv-card-row ');
      rows.map((p, plan) => {
        const planObj = ch(plan);
        const price = planObj.find('.txt_amt').text().trim().replace('`', '');
        const validity = planObj
          .find('.val_width')
          .find('.pkv_txt_info')
          .text()
          .trim()
          .replace('days', '');
        const dataLimit = planObj
          .find('.data_width')
          .find('.pkv_txt_info')
          .text()
          .trim();
        const subWidth = planObj.find('.sub_width').find('img');
        let advantages: string[] = [];

        subWidth.map((s, sub) => advantages.push(ch(sub).attr('alt') || ''));
        plans.push({
          price: +price,
          validity_in_days: +validity,
          advantages_length: subWidth.length,
          advantages: advantages,
          data: dataLimit,
          bundle_name: bundleTitle,
          provider_name: provider.name,
        });
      });
    });
  });

  return plans;
};
