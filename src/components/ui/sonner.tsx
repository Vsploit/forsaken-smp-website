


const Toaster = () => null;

let toastId = 0;
let existingToasts = 0;

const toast = (message: string, options: {type?: 'success'|'error'|'default'; duration?: number} = {}) => {
  const id = ++toastId;
  const type = options.type || 'default';
  const duration = options.duration || 4000;
  
  const toastDiv = document.createElement('div');
  toastDiv.dataset.toastId = id.toString();
  toastDiv.className = `fixed top-4 right-4 z-[9999] p-4 rounded-xl shadow-hard-lg border-4 border-black max-w-sm cursor-pointer transition-all duration-300 opacity-0 translate-x-full
    ${type === 'success' ? 'bg-green-500/90 text-white backdrop-blur' : ''}
    ${type === 'error' ? 'bg-red-500/90 text-white backdrop-blur' : ''}
    ${type === 'default' ? 'bg-gray-800/90 text-white backdrop-blur' : ''}`;
  toastDiv.textContent = message;
  toastDiv.style.top = `${16 + existingToasts * 108}px`;
  
  document.body.appendChild(toastDiv);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toastDiv.classList.remove('opacity-0', 'translate-x-full');
    toastDiv.classList.add('opacity-100', 'translate-x-0');
  });
  
  existingToasts++;

  // Store timeout on toast for reliable clearing
  (toastDiv as any).timeoutRef = setTimeout(() => removeToast(id), duration);

  // Click to remove
  toastDiv.addEventListener('click', () => {
    clearTimeout((toastDiv as any).timeoutRef);
    removeToast(id);
  });
};

const removeToast = (id: number) => {
  const toastDiv = document.querySelector(`[data-toast-id="${id}"]`) as HTMLElement;
  if (toastDiv) {
    toastDiv.classList.add('opacity-0', 'translate-x-full');
    toastDiv.classList.remove('opacity-100', 'translate-x-0');
    setTimeout(() => {
      clearTimeout((toastDiv as any).timeoutRef);
      toastDiv.remove();
      existingToasts = Math.max(0, existingToasts - 1);
      // Update positions of remaining toasts
      const remainingToasts = document.querySelectorAll('[data-toast-id]');
      remainingToasts.forEach((t, index) => {
        (t as HTMLElement).style.top = `${16 + index * 108}px`;
      });
    }, 300);
  }
};

export { Toaster, toast }
