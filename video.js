// Returns a file path from local for appropriate advertisement
// Input: JSON Object from IBM IoT
// Output: path to the advertisement video
function getLink(data) {

	const prefix = './videos/';

	let face = data.result.images[0].faces[0];
	let averageAge = (face.age.min + face.age.max) / 2;
	let gender = face.gender.gender; // either MALE or FEMALE
	let isMale = gender === 'MALE';

	if (averageAge < 18) {
		return prefix + 'game.mp4';
	} else if (averageAge >= 18 && averageAge < 55) {
		if (isMale)
			return prefix + 'car.mp4';
		else
			return prefix + 'fashion.mp4';
	} else {
		return prefix + 'retirement.mp4';
	}

}

// TEST CODE: WORKING!
//
// var link = getLink({
// 	"topic": "iot-2/type/Phone/id/777-777-7777/evt/frame/fmt/buffer",
// 	"payload": "see msg.result",
// 	"deviceId": "777-777-7777",
// 	"deviceType": "Phone",
// 	"eventType": "frame",
// 	"format": "buffer",
// 	"_msgid": "b98f0583.4670f8",
// 	"result": {
// 		"images": [{
// 			"faces": [{
// 				"age": {
// 					"max": 44,
// 					"min": 35,
// 					"score": 0.502468
// 				},
// 				"face_location": {
// 					"height": 187,
// 					"left": 549,
// 					"top": 916,
// 					"width": 155
// 				},
// 				"gender": {
// 					"gender": "MALE",
// 					"score": 0.993307
// 				},
// 				"identity": {
// 					"name": "Barack Obama",
// 					"score": 0.982014,
// 					"type_hierarchy": "/people/politicians/democrats/barack obama"
// 				}
// 			}],
// 			"image": "1161019-29-3qumgo.jpg"
// 		}],
// 		"images_processed": 1
// 	}
// });

// console.log(link);