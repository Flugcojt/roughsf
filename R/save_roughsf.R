#' Save roughsf plot to file
#' @param rsf result from calling the function `roughsf`
#' @param file filename
#' @param background string giving the html background color
#' @param wait time in seconds to wait for page load
#' @export
save_roughsf <- function(rsf,file,background = "white",wait = 4){
  if(!requireNamespace("pagedown", quietly = TRUE)){
    stop("pagedown is needed for this function to work. Please install it.", call. = FALSE)
  }
  tfile <- tempfile(fileext = ".html")
  format <- substr(file,nchar(file)-2,nchar(file))
  htmlwidgets::saveWidget(rsf, file = tfile,background = background,selfcontained = TRUE)
  suppressMessages(pagedown::chrome_print(normalizePath(tfile),output=normalizePath(file),format=format,selector = "canvas#canvas",wait=wait))
  suppressMessages(file.remove(tfile))
}
