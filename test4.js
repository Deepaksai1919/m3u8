data = 'https://vod.testbook.com/60be379f387f18cb9b101d7c/720p_000.ts?ts=1639290664&t=817f336cae723248aa3c69ad6154875293639bc2'
console.log(data.match(/(\d+.ts)/gm)[0].replace('.ts',''))