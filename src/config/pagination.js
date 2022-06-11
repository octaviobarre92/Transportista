export const Paginaton = (arr, page, pageNumbers) => {
    return arr.slice((page * pageNumbers) - pageNumbers, page * pageNumbers)
}