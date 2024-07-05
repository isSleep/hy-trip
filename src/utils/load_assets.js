export const getAssetURL = (image) => {
    // 参数一 传入图片的地址离当前文件的相对路径
    // 参数二  当前文件路径的URL
    return new URL(`../assets/img/${image}`,import.meta.url).href
}