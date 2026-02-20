const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
});

function handleFiles(files){
    for(let file of files){
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";

        const fileInfo = document.createElement("div");
        fileInfo.innerHTML = `
            ${file.name} (${(file.size/1024).toFixed(1)} KB)
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
        `;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => fileItem.remove();

        fileItem.appendChild(fileInfo);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);

        simulateUpload(fileItem.querySelector(".progress-bar"));
    }
}

function simulateUpload(progressBar){
    let width = 0;
    const interval = setInterval(() => {
        if(width >= 100){
            clearInterval(interval);
        }else{
            width += 5;
            progressBar.style.width = width + "%";
        }
    },100);
}
