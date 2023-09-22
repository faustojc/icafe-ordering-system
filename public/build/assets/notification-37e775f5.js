function i(t,s){const r=`toast-${Date.now()}`,e=document.createElement("div");switch(e.id=r,e.className="fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",e.role="alert",e.innerHTML=`
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"></div>
    <div class="ml-3 text-sm font-normal">${t}</div>
    <button data-dismiss-target="#${r}" aria-label="Close" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>`,s){case"success":e.querySelector(".inline-flex").classList.add("text-green-500","bg-green-100","dark:bg-green-800","dark:text-green-200"),e.querySelector(".inline-flex").innerHTML=`
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>`;break;case"error":e.querySelector(".inline-flex").classList.add("text-red-500","bg-red-100","dark:bg-red-800","dark:text-red-200"),e.querySelector(".inline-flex").innerHTML=`
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span class="sr-only">Error icon</span>
                </div>`;break;case"warning":e.querySelector(".inline-flex").classList.add("text-yellow-500","bg-yellow-100","dark:bg-yellow-800","dark:text-yellow-200");break;case"info":e.querySelector(".inline-flex").classList.add("text-blue-500","bg-blue-100","dark:bg-blue-800","dark:text-blue-200");break}document.querySelector("#notification").insertBefore(e,document.querySelector("#notification").firstChild),e.classList.add("transition","transition-opacity"),setTimeout(()=>{e.remove()},3e3),e.querySelector("[data-dismiss-target]").addEventListener("click",()=>{e.remove()})}const n=document.head.querySelector('meta[name="api-token"]'),a=document.head.querySelector('meta[name="userId"]');n&&(window.apiToken=n.content);a&&(window.userId=a.content);window.Echo.private(`App.Models.Admin.${window.userId}`).notification(t=>{i(t.message,t.notification_type)});
