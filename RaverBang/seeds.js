const mongoose = require("mongoose");
const Rave = require("./models/rave");
const Comment = require("./models/comment");

let data = [
    {
        name: "Red Frog",
        image: "https://media.timeout.com/images/103528186/1024/576/image.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Bistro 100 Maneiras",
        image: "https://media.timeout.com/images/103673014/1024/576/image.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Double9",
        image: "https://media.timeout.com/images/103807985/1024/576/image.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Lisbonita Gin Bar",
        image: "https://media.timeout.com/images/103817685/1024/576/image.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB() {
    //Remove all raves
    Rave.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        /*console.log("removed raves!");
        //add a few raves
        data.forEach((seed) => {
            Rave.create(seed, (err, rave) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a rave");
                    //create a comment
                    Comment.create(
                        {
                            text: "'Press for cocktails' quando encontrar um sapo vermelho no final da rua do Salitre, e descerá as escadas para um bar Inspirado nos bares clandestinos de NY na altura da lei seca. De luz baixa e decoração muito gira, o serviço é muito simpático e logo quando chegamos trazem-nos água aromatizada com pepino... de facto para bebermos álcool, devemos hidratar-nos!  \n" +
                                "Tem dois downsides: as mesas com poltronas serem um pouco juntas demais, o que dá pouca privacidade e a zona de fumadores ser apenas uma mesa comprida de cadeiras altas... acho que podiam ter reservado um cantinho de poltronas para os addicted ficarem melhor instalados.\n" +
                                "Este bar faz jus aos prémios que ganha, o cocktail estava fabuloso e super inovador com uma espuma de alga no cimo do copo (experimentem o Andaluzia para quem gosta de algo tipo bloody mary)!\n" +
                                "Os preços são os normais.... tem cerveja artesanal Letra que não aparece na carta de cocktails (5 euros) e os cocktails rondam os 10/12 euros. \n" +
                                "Vou ter de voltar porque falhei a passagem secreta... damn'it, estes meus 'spur of the moments' têm de ter ser melhor pesquisados de antemão. ;) ",
                            author: "Homer"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                rave.comments.push(comment);
                                rave.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });*/
    });
    //add a few comments
}

module.exports = seedDB;
