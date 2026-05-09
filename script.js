const DOM = {
    themeToggle: document.getElementById('theme-toggle'),
    nameInput: document.getElementById('name-input'),
    clockDisplay: document.getElementById('clock-display'),
    dateDisplay: document.getElementById('date-display'),
    greetingText: document.getElementById('greeting-text'),
    
    timerDisplay: document.getElementById('timer-countdown'),
    btnStart: document.getElementById('btn-start'),
    btnPause: document.getElementById('btn-pause'),
    btnReset: document.getElementById('btn-reset'),
    durationInput: document.getElementById('duration-input'),
    
    todoForm: document.getElementById('todo-form'),
    todoInput: document.getElementById('todo-input'),
    todoList: document.getElementById('todo-list'),
    
    linkForm: document.getElementById('link-form'),
    linkName: document.getElementById('link-name'),
    linkUrl: document.getElementById('link-url'),
    linksContainer: document.getElementById('links-container')
};

let userName = localStorage.getItem('userName') || 'Yoan';
DOM.nameInput.value = userName;

let isDark = localStorage.getItem('theme') === 'dark';
if (isDark) document.body.classList.add('dark-mode');

DOM.themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

DOM.nameInput.addEventListener('input', (e) => {
    userName = e.target.value.trim();
    localStorage.setItem('userName', userName);
    updateClockAndGreeting();
});

function updateClockAndGreeting() {
    const now = new Date();
    
    DOM.clockDisplay.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    DOM.dateDisplay.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const hour = now.getHours();
    let salam = 'Selamat Malam';
    if (hour >= 5 && hour < 12) salam = 'Selamat Pagi';
    else if (hour >= 12 && hour < 15) salam = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) salam = 'Selamat Sore';
    
    const displayName = userName ? userName : 'Kawan';
    DOM.greetingText.textContent = `${salam}, ${displayName}!`;
}
setInterval(updateClockAndGreeting, 1000);
updateClockAndGreeting();

let timerInterval;
let timerDuration = parseInt(localStorage.getItem('timerDuration')) || 25;
let timeLeft = timerDuration * 60;
DOM.durationInput.value = timerDuration;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimerUI() {
    DOM.timerDisplay.textContent = formatTime(timeLeft);
}

DOM.durationInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1; 
    if (val > 120) val = 120;
    
    timerDuration = val;
    localStorage.setItem('timerDuration', timerDuration);
    
    clearInterval(timerInterval);
    timeLeft = timerDuration * 60;
    updateTimerUI();
});

DOM.btnStart.addEventListener('click', () => {
    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerUI();
        } else {
            clearInterval(timerInterval);
            alert('Waktu fokus selesai! Bagus sekali.');
        }
    }, 1000);
});

DOM.btnPause.addEventListener('click', () => clearInterval(timerInterval));

DOM.btnReset.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = timerDuration * 60;
    updateTimerUI();
});
updateTimerUI();

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    DOM.todoList.innerHTML = '';
    
    const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);
    
    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'glass-card'; 
        if (todo.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <span class="todo-text" onclick="toggleTodo(${todo.id})">${todo.text}</span>
            <div class="todo-actions">
                <button class="btn-secondary glass-btn" onclick="editTodo(${todo.id})" title="Edit">✏️</button>
                <button class="btn-danger glass-btn" onclick="deleteTodo(${todo.id})" title="Hapus">🗑️</button>
            </div>
        `;
        DOM.todoList.appendChild(li);
    });
}

DOM.todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = DOM.todoInput.value.trim();
    if (!text) return;
    
    if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
        alert('Tugas ini sudah ada di daftarmu!');
        return;
    }

    todos.push({ id: Date.now(), text, completed: false });
    saveTodos();
    renderTodos();
    DOM.todoInput.value = '';
});

window.toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
};

window.editTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newText = prompt('Ubah tugas:', todo.text);
    if (newText && newText.trim() !== '') {
        const cleanText = newText.trim();
        if (todos.some(t => t.text.toLowerCase() === cleanText.toLowerCase() && t.id !== id)) {
            alert('Tugas dengan nama ini sudah ada!');
            return;
        }
        todo.text = cleanText;
        saveTodos();
        renderTodos();
    }
};

window.deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
};
renderTodos();

let links = JSON.parse(localStorage.getItem('links')) || [];

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
}

function renderLinks() {
    DOM.linksContainer.innerHTML = '';
    links.forEach(link => {
        const div = document.createElement('div');
        div.className = 'link-item glass-card'; 
        div.innerHTML = `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" title="${link.name}">
                ${link.name}
            </a>
            <button class="delete-link" onclick="deleteLink(${link.id})" title="Hapus Tautan">&times;</button>
        `;
        DOM.linksContainer.appendChild(div);
    });
}

DOM.linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = DOM.linkName.value.trim();
    let url = DOM.linkUrl.value.trim();
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url; 
    }
    
    links.push({ id: Date.now(), name, url });
    saveLinks();
    renderLinks();
    DOM.linkForm.reset();
});

window.deleteLink = (id) => {
    links = links.filter(l => l.id !== id);
    saveLinks();
    renderLinks();
};
renderLinks();
