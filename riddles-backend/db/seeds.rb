# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


anne = User.create(name: "Anne")

Riddle.create([
    {
        content: "The more I dry, the wetter I get, What am I?",
        answer: "towel",
        user: anne
    },
    {
        content: "Forwards, I am heavy, backwards I am not, what am I?",
        answer: "ton",
        user: anne
    },
    {
        content: "I leave everytime you say my name, what am I?",
        answer: "silence",
        user: anne
    },
    {
        content: "Thursday before Tuesday; Three before two; Today before yesterday; Me before you; what am I?",
        answer: "Dictionary",
        user: anne
    }
])