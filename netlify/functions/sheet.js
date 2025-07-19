const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const SHEET_ID = '1tmUnbXHENlO6TYXN1bmzCDRhtG1d2qENfgDQk7KdX9s';
  const API_KEY = process.env.GOOGLE_SHEET_API_KEY;
  const RANGE = 'Allstar!A2:H';

  const ranges = ['Allstar!A2:G', 'Uhlmann!A2:G'];

  // 각 시트를 fetch 요청으로 변환
  const requests = ranges.map(range => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    return fetch(url).then(res => res.json());
  });

  // 병렬 처리
  const results = await Promise.all(requests);

  // 결과 합치기
  const combinedRows = results.flatMap(result => result.values || []);

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ values: combinedRows })
  };
};
