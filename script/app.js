const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	
	new Question("Определите годы первой мировй войны ", 
	[
		new Answer('1914-1915', 0),
		new Answer("1914-1919", 0),
		new Answer("1918-1999999", 0),
		new Answer("1914-1918", 1)
	]),
	new Question("Кого в древнем Египте называли богом солнца?", 
	[
		new Answer('Солнечный диск Ра', 1),
		new Answer("Зевс бог грома и молний", 0),
		new Answer("Фараон Аменхотеп", 0),
		new Answer("Аппалон", 0)
	]),
	new Question("Как зовут известную масагетскую царицу которая сразиласт с  Киром 2 и спасла свою страну от вторжения Персов ", 
	[
		new Answer('Клеопатра', 0),
		new Answer("Роксанак", 0),
		new Answer("Ширак", 0),
		new Answer("Томарис", 1)
	]),
	new Question("Отец истории так называли известного греческого путешественника...", 
	[
		new Answer('Ахилеса ', 0),
		new Answer("Геродота", 1),
		new Answer("Архимеда", 0),
		new Answer("Аристотель", 0)
	]),
	new Question("Великий тюркский полкаводец в 1336-1405 года Основатель исзвестной империи Тимуридов...", 
	[
		new Answer('Амир Тимур', 1),
		new Answer("Захридин Бобур ", 0),
		new Answer("Шейбанихан ", 0),
		new Answer("Чингизсхан", 0)

	]),
	new Question("Кто из известных ученых был ссожен на костре по приказу инквизиции за идею о вселенной и о том что земля вращаеться вокруг солнца ", 
	[
		new Answer('Коперник ', 0),
		new Answer("Джордано Бруно", 1),
		new Answer("Галилео Галилей ", 0),
		new Answer("Папа римский", 0)
	]),
	new Question("Как звали знаменитого универсального ученого изобретателя и ходожника 16 века изобрел танк, паршут,вертолет, пушки, написал картину Монализа ", 
	[
		new Answer('Галилей', 0),
		new Answer("Леонардо де Каприо", 0),
		new Answer("Леонардо да Винчи", 1),
		new Answer("Илон Маск", 0)
	]),
	new Question("Как называют известную наклонную башню по легенде часть единого комплекса ... этого собора", 
	[
		new Answer('Статую ясвободы', 0),
		new Answer("Башня Леонардо ", 0),
		new Answer("Эфелевая башня ", 0),
		new Answer("Пизанская башня Италия", 1)
	]),
	new Question("Это чудо света до сих пор существует и привлекает множество людей со всего мира", 
	[
		new Answer('Египетские пирамиды', 1),
		new Answer("Статуя Зевса", 0),
		new Answer("Сады Семерамиды", 0),
		new Answer("Статуя Гелиоса на Родосе", 0)
	]),
	new Question("Как Егптяне называли свою страну в древности?", 
	[
		new Answer('Красаная земля', 0),
		new Answer("Белая земля ", 0),
		new Answer("Черная земля", 1),
		new Answer("желтая земля ", 0)
	]),


	new Question("Когда и кем была открыта Америка?", 
	[
		new Answer('Америго Виспучи 1499 год ', 0),
		new Answer("Васко да Гамма 1506 ", 0),
		new Answer("Христофор Колумб 1492", 1),
		new Answer("Барталамео Диаш 1602", 0)
	]),
	new Question("Первобытный человек живший в эпоху среднего палеолита...", 
	[
		new Answer('Неандерталец', 1),
		new Answer("Кроманьонец", 0),
		new Answer("Синантроп", 0),
		new Answer("Питекантроп", 0)
	]),
	new Question("Подвиг это простого пстуха вошло в историю как сопротивление против захватчиков Персов, о ком речь", 
	[
		new Answer('Дарий', 0),
		new Answer("Томарис ", 0),
		new Answer("пастух Спитама ", 0),
		new Answer("пастух Ширак ", 1)
	]),
	new Question("Знаменитый музей Лувр распологается в городе", 
	[
		new Answer('Рим', 0),
		new Answer("Париж", 1),
		new Answer("Ташкент", 0),
		new Answer("Лондон ", 0)
	]),
	new Question("Определите правильно годы второй мировой войны", 
	[
		new Answer('1939-1945 ', 1),
		new Answer("1993-1954", 0),
		new Answer("1919-1995", 0),
		new Answer("1941-1945", 0)

	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



