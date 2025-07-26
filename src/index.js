const audioUrls = [
    'https://f.feridinha.com/wN9Ls.mp3',
    'https://f.feridinha.com/2sl0G.mp3',
    'https://f.feridinha.com/ifJ8f.mp3',
    'https://f.feridinha.com/QCUPs.mp3',
    'https://f.feridinha.com/6C3UI.mp3',
    'https://f.feridinha.com/9SAWk.mp3',
    'https://f.feridinha.com/9iSWv.mp3',
    'https://f.feridinha.com/Jd5sZ.mp3',
    'https://f.feridinha.com/xXerQ.mp3',
    'https://f.feridinha.com/b6KRX.mp3'
];

export default async function handler(req, res) {
    try {
        const randomIndex = Math.floor(Math.random() * audioUrls.length);
        const randomAudioUrl = audioUrls[randomIndex];
        const audioResponse = await fetch(randomAudioUrl);

        if (!audioResponse.ok) {
            throw new Error(`failed to fetch audio: ${audioResponse.status}`);
        }

        const audioBuffer = await audioResponse.arrayBuffer();

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuffer.byteLength);
        res.setHeader('Cache-Control', 'no-cache');
        res.status(200).send(Buffer.from(audioBuffer));
    } catch (error) {
        console.error('error serving audio:', error);
        res.status(500).send('error loading audio file');
    }
}
