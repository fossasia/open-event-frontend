export const getScript = (url: string): Promise<void> => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;

  script.onerror = reject;

  script.onload = (script as any).onreadystatechange = function() {
    const loadState = this.readyState;

    if (loadState && loadState !== 'loaded' && loadState !== 'complete') {return}

    script.onload = (script as any).onreadystatechange = null;

    resolve();
  };

  document.head.appendChild(script);
});
