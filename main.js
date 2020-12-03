
function generateUsername() {
    return "temporaryUsername"
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function pingBridge(ip) {
    var username = generateUsername();
    $.ajax({
        url: "https://" + ip + "/api",
        type: "POST",
        data: JSON.stringify({"devicetype": username}),
        success: function (data) {
            console.log(data);
            if (data[0].error != null) {
                return null
            } else {
                var username = data[0].success.username
                return username
            }
        },
        error: function (data) {
            console.log("error!")
            console.log(data)
        }
    })
}

async function connectToBridge(ip) {
    var connectedToBridge = false;
    var bridgeUsername = ""

    while (!connectedToBridge) {
        var response = pingBridge(ip)

        if (response != null) {
            bridgeUsername = response
            connectedToBridge = true;
        }

        await sleep(5000)
    }
    console.log(response)

    return bridgeUsername
}

async function getCurrentSong() {
    $.ajax({
        url: "https://accounts.spotify.com/authorize",
        data: JSON.stringify({
            "client_id": client_id,
            "response_type": "code",
            "redirect_uri": "https://devanturtle7.github.io/SpotifyHue/api/v1/logging-in"
        }),
        type: "GET",
        success: function(data) {
            console.log("success")
            console.log(data)
        },
        error: function(data) {
            console.log("error")
            console.log(data)
        }
    })
}

function spotifyLogin() {
    location.replace("https://accounts.spotify.com/authorize?response_type=code&client_id="+client_id+"&redirect_uri="+redirect_uri);
}

function main() {
    //var ip = prompt("enter ip:");
    //connectToBridge(ip)
    getCurrentSong()
}

$(document).ready(main);