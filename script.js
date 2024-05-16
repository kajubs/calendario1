document.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const renderCalendar = () => {
        date.setDate(1);

        const monthDays = document.querySelector('.days');
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDayIndex = date.getDay();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const nextDays = 7 - lastDayIndex - 1;

        const monthYear = document.getElementById('month-year');
        monthYear.innerHTML = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        let days = "";

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="empty">${prevLastDay - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            days += `<div class="day">${i}</div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="empty">${j}</div>`;
        }

        monthDays.innerHTML = days;

        // Adiciona evento de clique aos dias
        const allDays = document.querySelectorAll('.day');
        allDays.forEach(day => {
            day.addEventListener('click', () => {
                // Aqui você pode adicionar a lógica para marcar um evento no dia clicado
                const selectedDate = new Date(date.getFullYear(), date.getMonth(), parseInt(day.textContent));
                console.log('Dia clicado:', selectedDate);
                // Exemplo de ação: adicionar classe para destacar o dia clicado
                day.classList.toggle('selected');
            });
        });
    };

    document.getElementById('prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    
});

// Objeto para armazenar as tarefas por dia
const tasks = {};

// Função para adicionar uma tarefa para um determinado dia
const addTask = (date, task) => {
    const dateString = date.toISOString().split('T')[0]; // Obtém a string da data no formato 'YYYY-MM-DD'
    if (!tasks[dateString]) {
        tasks[dateString] = []; // Inicializa um array vazio para o dia, se ainda não existir
    }
    tasks[dateString].push(task); // Adiciona a tarefa ao array de tarefas para o dia
};

// Função para exibir as tarefas de um determinado dia
const showTasks = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Obtém a string da data no formato 'YYYY-MM-DD'
    const taskList = tasks[dateString]; // Obtém o array de tarefas para o dia

    if (taskList && taskList.length > 0) {
        console.log(`Tarefas para ${dateString}:`);
        taskList.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    } else {
        console.log(`Não há tarefas para ${dateString}.`);
    }
};

// Função para adicionar uma tarefa ao dia clicado
const handleDayClick = (dayElement) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), parseInt(dayElement.textContent));

    // Verifica se o dia já está marcado
    if (dayElement.classList.contains('selected')) {
        // Se já estiver marcado, remove a marcação
        dayElement.classList.remove('selected');
        // Aqui você pode adicionar a lógica para desmarcar o evento do dia clicado, como remover do banco de dados, etc.
        console.log('Evento desmarcado para o dia:', selectedDate);
    } else {
        // Se não estiver marcado, marca o dia
        dayElement.classList.add('selected');
        // Aqui você pode adicionar a lógica para marcar o evento do dia clicado, como adicionar ao banco de dados, etc.
        console.log('Evento marcado para o dia:', selectedDate);
        
        // Adiciona uma tarefa para o dia clicado
        const task = prompt('Adicione uma tarefa para este dia:');
        if (task) {
            addTask(selectedDate, task);
            showTasks(selectedDate);
        }
    }
};

// Adiciona evento de clique aos dias
const allDays = document.querySelectorAll('.day');
allDays.forEach(day => {
    day.addEventListener('click', () => {
        handleDayClick(day);
    });
});


