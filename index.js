const Discord = require('discord.js');
const bot = new Discord.Client();
const myServer = "541976982968074241";
const PREFIX = '!';
const version = '1.2.0'
var memberReserve = "";
var memberPlays = "12344";
var herandok = 0;
var servers = {};
const ytdl = require("ytdl-core");
const token = 'NzMwNDIwNjUxNTc1NDc2Mjc1.XwgOag.H75VN6wU7HTn5h71mIeJYho3UMo';
bot.on('ready', () => {
    console.log('This bot is online!');
    bot.user.setActivity("пишите !help ё-маё");
})

bot.on('guildMemberAdd', member => {
    if(member.guild.id != myServer){
        return;
    }
    member.send(`Здравстуй, ${member.user.username}! Ты присоединился к нашему серверу ${member.guild.name}. Будь тут как дома, если что непонятно - спрашивай.`);
    if(member.guild.id = "541976982968074241"){
        member.roles.add("631797041126965250");
    }
})
























bot.on('message', msg => {
    //if(msg.guild.id != myServer){
    //    return;
    //}
    if(!msg.content.startsWith(PREFIX) || msg.author.bot) return;
    let args = msg.content.slice(PREFIX.length).split(" ");
    var commands = args[0].toLowerCase();
    switch(commands){ 
        
        case 'ping':
            msg.channel.send('Понг!');
            break;
        case 'play':
            
            function play(connection, message){
                
                console.log(msg.member.id)
                memberPlays = msg.member.id;
                memberReserve = msg.member.id;
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}))

                server.queue.shift()

                server.dispatcher.on('end', function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                });
            }    


            if(!args[1]) {
                msg.channel.send('Ты должен предоставить ссылку на видео в ютубе!');
                return;
            }
            if(!msg.member.voice.channel){
                msg.channel.send('Ты должен войти в голосовой канал, чтобы я смог проиграть музыку!')
                return;
            }

            if(!servers[msg.guild_id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push(args[1]);

            if(!msg.guild.voiceConnections) msg.member.voice.channel.join().then(function(connection){
                if (herandok === 0) {
                    herandok++;
                    memberPlays = msg.member.id;
                } 
                if (memberPlays != msg.member.id) {
                    msg.channel.send("крыса");
                    return;
                }
                play(connection, msg);
                
            })
        break;
        case 'stop':
            console.log(msg.member.id);
            if (memberPlays === "") {
                console.log("not okay1")
                return;
            } 
            if (memberReserve === "") {
                console.log("not okay")
                return;
            }
            if (memberPlays != msg.member.id) {
                msg.channel.send('придурак не ты запускал(-а)');
                return;
            }
            memberPlays = "";
            herandok = 0;
            if(!msg.member.voice.channel) return msg.channel.send("Ты должен быть в канале где нахожусь я, чтобы остановить музыку!")
            msg.member.voice.channel.leave();
        break;
        case 'help':
            const embed = new Discord.MessageEmbed()
            .setTitle("Команды:")
            .addField(`${PREFIX}help`, "Показывает это окно.")
            .addField(`${PREFIX}ping`, "Тестовая функция.")
            .addField(`${PREFIX}clear`, "Очистка сообщений.")
            .addField(`${PREFIX}play`, "Проигрывает музыку в голсовом чате.")
            .addField(`${PREFIX}stop`, "Останавливает музыку.")
            .addField(`${PREFIX}youtube`, "Выводит ссылку на канал автора бота.")
            .addField(`${PREFIX}info`, "Может вывести информацию о боте.")
            .addField(`${PREFIX}ban`, "С помощью это команды можно забанить человека.")
            .addField(`${PREFIX}kick`, "С помощью это команды можно кикнуть человека.")
            .setColor(0x00FFBD)
            msg.channel.send(embed);
        break;
        case 'ghj':
            msg.member.roles.add("731047073243332649");
        break;








        case 'youtube':
            msg.channel.send('https://www.youtube.com/channel/UCodLR9ucPsIptcw1-YyOGiA');
            break;
        case 'info':
            if(args[1] === 'version'){
                msg.channel.send(`Версия бота: ${version}`);
            }else {
                msg.channel.send(`Информация: \n1. ${PREFIX}info version`);
            }
            break;   
        case 'clear':
            if (!msg.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return msg.reply("Ты что сейчас пытаешься сделать? У тебя же прав на это нет! Ха-ха-ха!");
            if(!args[1]) return msg.reply ('ошибка. Напиши сколько сообщений удалить. Пример: '+PREFIX+'clear 5');
            if(!parseInt(args[1])){
                msg.channel.send('Аргумент не является числом! А-та-та тебе за это!');
                break;
            };
            msg.channel.bulkDelete(args[1]);
            msg.channel.send('Очистка завершена.');
            break;
        case 'kick':   
            if (!msg.member.hasPermission(["MANAGE_MESSAGES"])) return msg.reply("Ты что сейчас пытаешься сделать? У тебя же прав на это нет! Ха-ха-ха!"); 
            const user = msg.mentions.users.first();

            if(user){
                const member = msg.guild.member(user);

                if(member) {
                    member.kick().then(() => {
                        msg.channel.send(`Пользователь ${user.tag} был кикнут!`);
                    }).catch(err => {
                        msg.reply('Я не смог его кикнуть. :(');
                        console.log(err);
                    })
                }else {
                    msg.reply("Я не смог найти этого юзера! Он точно тут?")
                }           
            }else {
                msg.reply("Странно. Что-то пошло не по плану. Варианта 2:\n1. Ты не указал пользователя.\n2. Что-то произошло с моим кодом.")
            }
        break;
        case 'ban':   
            if (!msg.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return msg.reply("Ты что сейчас пытаешься сделать? У тебя же прав на это нет! Ха-ха-ха!"); 
            const user1 = msg.mentions.users.first();

            if(user1){
                const member1 = msg.guild.member(user1);

                if(member1) {
                    member1.ban().then(() => {
                        msg.channel.send(`Пользователь ${user1.tag} был забанен!`);
                    }).catch(err => {
                        msg.reply('Я не смог его забанить. :(');
                        console.log(err);
                    })
                }else {
                    msg.reply("Я не смог найти этого юзера! Он точно тут?")
                }           
            }else {
                msg.reply("Странно. Что-то пошло не по плану. Варианта 2:\n1. Ты не указал пользователя.\n2. Что-то произошло с моим кодом.")
            }
        break;
    }











})





bot.login(token);
