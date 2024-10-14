export const isValidImageUrl = (url:string, defaultUrl: string) => {
    // return (
    //   typeof url === "string" &&
    //   (url.startsWith("http://") || url.startsWith("https://")) || defaultUrl
    if(url.startsWith("http://") || url.startsWith("https://")){
        return url;
    }else{
        return defaultUrl;
    }
    // );
  };
