const ageInput = document.querySelector("#age-input")
const resultWrapper = document.querySelector("#result-wrapper")
const result = document.querySelector("#result")
let usedInput = false

const currentYear = new Date().getFullYear()
const generations = [{name: "The Lost Generation", dates: "1890-1900"},
    {name: "The Interbellum Generation", dates: "1901-1913"},
    {name: "The Greatest Generation", dates: "1914-1924"},
    {name: "The Silent Generation", dates: "1925-1945"},
    {name: "The Baby Boomers", dates: "1946-1964"},
    {name: "Generation X", dates: "1965-1979"},
    {name: "Millennials", dates: "1980-1994"},
    {name: "Generation Z", dates: "1995-2012"},
    {name: "Generation Alpha", dates: "2013-2025"}]

const getGeneration = (birthYear) => {
    let generation = generations.find(generation => {
        let [start, end] = generation.dates.split("-")
        return birthYear >= start && birthYear <= end
    })

    return generation ? generation.name : "Unknown"
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!usedInput) {
            if (ageInput.readOnly && resultWrapper.style.display === "block") {
                ageInput.readOnly = false
                ageInput.style.display = "block"
                ageInput.value = ""
                ageInput.focus()

                resultWrapper.style.display = "none"
                document.getElementById("use-again").style.display = "none"   
            }
        }
    }
})

ageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!ageInput.readOnly) {
            let birthYear = currentYear - ageInput.value
            let generation = getGeneration(birthYear)

            // ageInput.value = "You're part of " + generation
            resultWrapper.style.display = "block"
            result.innerHTML = generation

            ageInput.readOnly = true
            ageInput.style.display = "none"

            document.getElementById("use-again").style.display = "block"

            usedInput = true

            setTimeout(() => {
                usedInput = false
            }, 1000)
        }
    }
})