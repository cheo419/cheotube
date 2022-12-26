// const ffpmeg = createFFmpeg({
//   corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js",
//   log: true,
// });

// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// const startBtn = document.getElementById("startBtn");
// const video = document.getElementById("preview");

// let stream;
// let recorder;
// let videoFile;

// const handleDownload = async () => {
//   const ffmpeg = createFFmpeg({ log: true });
//   await ffmpeg.load();

//   ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

//   await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

//   await ffmpeg.run(
//     "-i",
//     "recording.webm",
//     "-ss",
//     "00:00:01",
//     "-frames:v",
//     "1",
//     "thumbnail.jpg"
//   );

//   const mp4File = ffmpeg.FS("readFile", "output.mp4");
//   const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

//   const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
//   const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

//   const mp4Url = URL.createObjectURL(mp4Blob);
//   const thumbUrl = URL.createObjectURL(thumbBlob);

//   const a = document.createElement("a");
//   a.href = mp4Url;
//   a.download = "MyRecording.mp4";
//   document.body.appendChild(a);
//   a.click();

//   const thumbA = document.createElement("a");
//   thumbA.href = thumbUrl;
//   thumbA.download = "MyThumbnail.jpg";
//   document.body.appendChild(thumbA);
//   thumbA.click();

//   ffmpeg.FS("unlink", "recording.webm");
//   ffmpeg.FS("unlink", "output.mp4");
//   ffmpeg.FS("unlink", "thumbnail.jpg");

//   URL.revokeObjectURL(mp4Url);
//   URL.revokeObjectURL(thumbUrl);
//   URL.revokeObjectURL(videoFile);
// };

// const handleStop = () => {
//   startBtn.innerText = "Download Recording";
//   startBtn.removeEventListener("click", handleStop);
//   startBtn.addEventListener("click", handleDownload);
//   recorder.stop();
// };

// const handleStart = () => {
//   startBtn.innerText = "Stop Recording";
//   startBtn.removeEventListener("click", handleStart);
//   startBtn.addEventListener("click", handleStop);
//   recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
//   recorder.ondataavailable = (event) => {
//     videoFile = URL.createObjectURL(event.data);
//     video.srcObject = null;
//     video.src = videoFile;
//     video.loop = true;
//     video.play();
//   };
//   console.log(recorder);
//   recorder.start();
//   console.log(recorder);
//   setTimeout(() => {
//     recorder.stop();
//   }, 10000);
// };

// const init = async () => {
//   stream = await navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: true,
//   });
//   video.srcObject = stream;
//   video.play();
// };

// init();

// const tracks = stream.getTracks(); // 다운로드 후 카메라 off 하고싶을때
// tracks.forEach((track) => {
//   track.stop();
// });
// stream = null;

// startBtn.addEventListener("click", handleStart);

// ```````````````NOMAD CODE```````````````````

// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// const startBtn = document.getElementById("startBtn");
// const actionBtn = document.getElementById("actionBtn");
// const video = document.getElementById("preview");

// let stream;
// let recorder;
// let videoFile;

// const files = {
//   input: "recording.webm",
//   output: "output.mp4",
//   thumb: "thumbnail.jpg",
// };

// const downloadFile = (fileUrl, fileName) => {
//   const a = document.createElement("a");
//   a.href = fileUrl;
//   a.download = fileName;
//   document.body.appendChild(a);
//   a.click();
// };

// const handleDownload = async () => {
//   actionBtn.removeEventListener("click", handleDownload);

//   actionBtn.innerText = "Transcoding...";

//   actionBtn.disabled = true;

//   const ffmpeg = createFFmpeg({ log: true });
//   await ffmpeg.load();

//   ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
//   ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

//   await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
//   await ffmpeg.run("-i", files.input, "-r", "60", files.output);

//   await ffmpeg.run(
//     "-i",
//     "recording.webm",
//     files.input,
//     "-ss",
//     "00:00:01",
//     "-frames:v",
//     "1",
//     "thumbnail.jpg"
//     files.thumb
//   );

//   const mp4File = ffmpeg.FS("readFile", "output.mp4");
//   const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
//   const mp4File = ffmpeg.FS("readFile", files.output);
//   const thumbFile = ffmpeg.FS("readFile", files.thumb);

//   const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
//   const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

//   const mp4Url = URL.createObjectURL(mp4Blob);
//   const thumbUrl = URL.createObjectURL(thumbBlob);

//   const a = document.createElement("a");
//   a.href = mp4Url;
//   a.download = "MyRecording.mp4";
//   document.body.appendChild(a);
//   a.click();

//   const thumbA = document.createElement("a");
//   thumbA.href = thumbUrl;
//   thumbA.download = "MyThumbnail.jpg";
//   document.body.appendChild(thumbA);
//   thumbA.click();
//   downloadFile(mp4Url, "MyRecording.mp4");
//   downloadFile(thumbUrl, "MyThumbnail.jpg");

//   ffmpeg.FS("unlink", "recording.webm");
//   ffmpeg.FS("unlink", "output.mp4");
//   ffmpeg.FS("unlink", "thumbnail.jpg");
//   ffmpeg.FS("unlink", files.input);
//   ffmpeg.FS("unlink", files.output);
//   ffmpeg.FS("unlink", files.thumb);

//   URL.revokeObjectURL(mp4Url);
//   URL.revokeObjectURL(thumbUrl);
//   URL.revokeObjectURL(videoFile);

//   actionBtn.disabled = false;
//   actionBtn.innerText = "Record Again";
//   actionBtn.addEventListener("click", handleStart);
// };

// const handleStop = () => {
//   startBtn.innerText = "Download Recording";
//   startBtn.removeEventListener("click", handleStop);
//   startBtn.addEventListener("click", handleDownload);
//   actionBtn.innerText = "Download Recording";
//   actionBtn.removeEventListener("click", handleStop);
//   actionBtn.addEventListener("click", handleDownload);
//   recorder.stop();
// };

// const handleStart = () => {
//   startBtn.innerText = "Stop Recording";
//   startBtn.removeEventListener("click", handleStart);
//   startBtn.addEventListener("click", handleStop);
//   actionBtn.innerText = "Stop Recording";
//   actionBtn.removeEventListener("click", handleStart);
//   actionBtn.addEventListener("click", handleStop);
//   recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
//   recorder.ondataavailable = (event) => {
//     videoFile = URL.createObjectURL(event.data);
//     video.srcObject = null;
//     video.src = videoFile;
//     video.loop = true;
//     video.play();
//   };
//   recorder.start();
// };
// const init = async () => {
//   stream = await navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: true,
//   });
//   video.srcObject = stream;
//   video.play();
// };

// init();

// startBtn.addEventListener("click", handleStart);
// actionBtn.addEventListener("click", handleStart);

// ```````````````````````````````
