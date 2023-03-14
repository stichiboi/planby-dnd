import { Channel, Program } from "../Epg";
import faker from "@faker-js/faker";

export interface ChannelEpg {
  channel: Channel,
  programs: Program[]
}

export function randomDate(hours: number): Date {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 1);
  baseDate.setHours(hours);
  const minutes = Math.random() * 60;
  baseDate.setMinutes(minutes);
  return baseDate;
}

function generateChannelEpg(id: string): ChannelEpg {
  const channel: Channel = {
    uuid: id,
    logo: "logo",
    position: {
      height: 10,
      top: 0
    }
  }

  const programs: Program[] = Array.from({ length: 10 }).map((_, i) => {
    const till = randomDate(i);
    return {
      channelUuid: channel.uuid,
      title: faker.commerce.product(),
      description: faker.lorem.paragraph(),
      since: till, till,
      id: `${id}_${i}`,
      image: "some image"
    }
  });
  programs.forEach((program, index) => {
    if (index > 0) {
      program.since = programs[index - 1].till;
    } else {
      program.since = 0;
    }
  });

  return { channel, programs }
}

export function generateRandomData() {
  return Array.from({ length: 3 }).map((_, i) => generateChannelEpg(i.toString()));
}

export const fixedData = [
  {
    "channel": {
      "uuid": "0",
      "logo": "logo",
      "position": {
        "height": 10,
        "top": 0
      }
    },
    "programs": [
      {
        "channelUuid": "0",
        "title": "Chicken",
        "description": "Quod itaque dolorem quia quasi est est. Dolore dolores dicta. Eos dolorem et. Odit explicabo consequatur. Cumque autem sit ducimus qui perferendis rem eaque. Numquam debitis ducimus autem quis animi dignissimos molestiae.",
        "since": 0,
        "till": "2023-03-12T20:16:48.549Z",
        "id": "0_0",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Pants",
        "description": "Tempora consequatur qui id esse facere. Aut eum numquam ipsam suscipit. Iusto numquam ab nesciunt aut sunt sed quas architecto. Velit magni et velit ipsam. Veritatis aut animi possimus et dolore eveniet porro aut repellat. Praesentium nihil consequatur.",
        "since": "2023-03-12T20:16:48.549Z",
        "till": "2023-03-12T21:38:48.549Z",
        "id": "0_1",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Sausages",
        "description": "Saepe enim dolorem sint dolor molestias deleniti tenetur qui quia. Deserunt commodi non minus enim. Blanditiis autem exercitationem.",
        "since": "2023-03-12T21:38:48.549Z",
        "till": "2023-03-12T22:01:48.549Z",
        "id": "0_2",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Keyboard",
        "description": "Inventore quibusdam non. Architecto iusto sunt tempore adipisci consequatur quae impedit nulla aut. Ratione aperiam in iusto nam et non aut harum consequatur. Similique dolores aspernatur autem numquam labore natus consectetur voluptatem. Possimus sed adipisci eveniet voluptatem nobis.",
        "since": "2023-03-12T22:01:48.549Z",
        "till": "2023-03-12T23:37:48.549Z",
        "id": "0_3",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Car",
        "description": "Maxime non consequuntur quam id. Esse eius minima officiis. Odit sit ipsam aut. Ipsa dolores praesentium qui facere et error qui consequatur. Quo saepe quis et.",
        "since": "2023-03-12T23:37:48.549Z",
        "till": "2023-03-13T00:45:48.549Z",
        "id": "0_4",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Towels",
        "description": "Quos porro doloribus nostrum aut ratione. Laboriosam autem provident aspernatur optio. Maxime cumque velit nesciunt modi placeat. Nisi odio expedita consequuntur eveniet. Vitae autem reiciendis. Nostrum in dolore saepe magnam dignissimos delectus.",
        "since": "2023-03-13T00:45:48.549Z",
        "till": "2023-03-13T01:31:48.549Z",
        "id": "0_5",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Gloves",
        "description": "Quidem provident omnis asperiores earum harum dolor. Sed consequatur rerum alias adipisci. Nesciunt qui laudantium error et quia quae.",
        "since": "2023-03-13T01:31:48.549Z",
        "till": "2023-03-13T02:15:48.549Z",
        "id": "0_6",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Fish",
        "description": "Id deserunt quia minus eum et voluptatibus molestiae. Est itaque est doloribus. Voluptas doloribus et deserunt dolorem eum illum. Nisi vero excepturi alias totam est. In vero rerum. Nisi optio cupiditate neque voluptatem ut eum laborum optio tenetur.",
        "since": "2023-03-13T02:15:48.549Z",
        "till": "2023-03-13T03:26:48.549Z",
        "id": "0_7",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Shoes",
        "description": "Voluptatibus quam recusandae perferendis totam nam sit fugiat nihil. Voluptatem ratione sunt nemo voluptatum rerum vero ducimus quia. Voluptatum earum voluptas.",
        "since": "2023-03-13T03:26:48.549Z",
        "till": "2023-03-13T04:42:48.549Z",
        "id": "0_8",
        "image": "some image"
      },
      {
        "channelUuid": "0",
        "title": "Hat",
        "description": "Molestiae eveniet possimus consequatur veniam pariatur doloribus qui. Numquam possimus magnam debitis accusamus omnis voluptatem quaerat quae. Et magnam sit quis molestiae quae illo rerum. Laborum ratione est et. Aliquid quidem rem voluptatum ut rerum.",
        "since": "2023-03-13T04:42:48.549Z",
        "till": "2023-03-13T05:17:48.549Z",
        "id": "0_9",
        "image": "some image"
      }
    ]
  },
  {
    "channel": {
      "uuid": "1",
      "logo": "logo",
      "position": {
        "height": 10,
        "top": 0
      }
    },
    "programs": [
      {
        "channelUuid": "1",
        "title": "Bike",
        "description": "Sunt autem neque voluptatibus aut quia nihil ad enim sunt. Aliquam nihil eum quia vitae beatae impedit. Cum omnis et saepe aut quae animi ea sed. Aliquid dolore praesentium qui similique dolore voluptatem voluptas.",
        "since": 0,
        "till": "2023-03-12T20:25:48.549Z",
        "id": "1_0",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Sausages",
        "description": "Asperiores voluptate quidem tempore est aut ipsa. Et eos voluptate labore ex. Optio praesentium deserunt necessitatibus ut explicabo eum facere. Officia repellat eius suscipit in consequatur.",
        "since": "2023-03-12T20:25:48.549Z",
        "till": "2023-03-12T21:22:48.549Z",
        "id": "1_1",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Chair",
        "description": "Impedit in pariatur quidem dolorem omnis quos qui nulla molestias. Labore voluptate assumenda quo. Eligendi asperiores perspiciatis. Ipsa rem nemo. Quam optio totam.",
        "since": "2023-03-12T21:22:48.549Z",
        "till": "2023-03-12T22:56:48.549Z",
        "id": "1_2",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Keyboard",
        "description": "Repellendus sit praesentium dignissimos aut et similique ut. Ut quaerat modi velit quia voluptatem. Nobis quia dolores nisi rerum. Sit unde aut ea dolorem omnis consectetur non reprehenderit.",
        "since": "2023-03-12T22:56:48.549Z",
        "till": "2023-03-12T23:00:48.549Z",
        "id": "1_3",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Mouse",
        "description": "Non nisi minus. Sequi qui nobis qui ullam dolores consequatur saepe in dignissimos. Saepe veritatis enim et. Ullam magnam omnis quo qui fugiat et a cumque. Quae minus provident officia deleniti quam quia voluptatem culpa.",
        "since": "2023-03-12T23:00:48.549Z",
        "till": "2023-03-13T00:26:48.549Z",
        "id": "1_4",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Chair",
        "description": "Est rerum odit fuga explicabo aut. Eos dolor animi doloremque. Dignissimos voluptatem vel sapiente sint soluta vitae veniam fugit voluptate. Non eligendi cumque rerum et ea ex. Sed dolorum cupiditate consequatur. Et porro quia esse aut.",
        "since": "2023-03-13T00:26:48.549Z",
        "till": "2023-03-13T01:56:48.549Z",
        "id": "1_5",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Shirt",
        "description": "Ut dolores impedit qui temporibus. Provident perspiciatis ipsa quos possimus voluptas nihil cum sunt. Error natus nam.",
        "since": "2023-03-13T01:56:48.549Z",
        "till": "2023-03-13T02:46:48.550Z",
        "id": "1_6",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Shoes",
        "description": "Vitae dignissimos mollitia omnis quo. Nisi explicabo ipsa alias qui omnis consequatur aut saepe aut. Est mollitia voluptatem tenetur rerum dolores. Quod eos excepturi deleniti. Sit saepe aliquam et atque incidunt. Omnis veniam in qui.",
        "since": "2023-03-13T02:46:48.550Z",
        "till": "2023-03-13T03:23:48.550Z",
        "id": "1_7",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Shirt",
        "description": "Unde impedit consectetur iure ducimus consequatur voluptates. Inventore quisquam maiores quia quidem repudiandae sed perspiciatis eum perspiciatis. Alias a et.",
        "since": "2023-03-13T03:23:48.550Z",
        "till": "2023-03-13T04:51:48.550Z",
        "id": "1_8",
        "image": "some image"
      },
      {
        "channelUuid": "1",
        "title": "Pants",
        "description": "Aut reiciendis cumque magnam facere sit odio voluptatem. Suscipit doloribus dolor est architecto quas et ducimus. Et dolore delectus qui corporis accusantium. Non dignissimos ullam. Possimus voluptas reiciendis aliquam. Quia cum perferendis accusantium.",
        "since": "2023-03-13T04:51:48.550Z",
        "till": "2023-03-13T05:04:48.550Z",
        "id": "1_9",
        "image": "some image"
      }
    ]
  },
  {
    "channel": {
      "uuid": "2",
      "logo": "logo",
      "position": {
        "height": 10,
        "top": 0
      }
    },
    "programs": [
      {
        "channelUuid": "2",
        "title": "Soap",
        "description": "Nobis ad eum. Porro soluta in sed quo aliquid laboriosam. Consequatur numquam velit dolorem.",
        "since": 0,
        "till": "2023-03-12T20:08:48.550Z",
        "id": "2_0",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Table",
        "description": "Eum quis vero sunt dolores atque error. Asperiores omnis sint molestias optio facere. Eos quia iste quas. Non accusamus nihil.",
        "since": "2023-03-12T20:08:48.550Z",
        "till": "2023-03-12T21:36:48.550Z",
        "id": "2_1",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Shoes",
        "description": "Ut tempore nobis iste vero. Veritatis consequatur expedita cumque sit rerum. Eos nemo animi repudiandae atque. Voluptatem saepe doloribus quis architecto possimus laudantium qui suscipit eos.",
        "since": "2023-03-12T21:36:48.550Z",
        "till": "2023-03-12T22:56:48.550Z",
        "id": "2_2",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Pants",
        "description": "Laboriosam veritatis consequatur. Est repellendus autem aut quasi unde earum. Debitis nemo at in sint similique a reiciendis rem dolorum.",
        "since": "2023-03-12T22:56:48.550Z",
        "till": "2023-03-12T23:52:48.550Z",
        "id": "2_3",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Soap",
        "description": "Odit quo facere est neque aliquid qui reprehenderit aut incidunt. Quis eos vel repellendus qui qui repudiandae illum natus. Dolorem aspernatur sed. Blanditiis voluptatibus voluptatibus quibusdam. Totam est sunt labore.",
        "since": "2023-03-12T23:52:48.550Z",
        "till": "2023-03-13T00:38:48.550Z",
        "id": "2_4",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Tuna",
        "description": "Repudiandae deleniti impedit ad facere sit omnis hic dolor. Fuga omnis sed qui dolores maiores. Nesciunt enim ut enim voluptas ut. Aspernatur deserunt quaerat molestiae modi dicta.",
        "since": "2023-03-13T00:38:48.550Z",
        "till": "2023-03-13T01:04:48.550Z",
        "id": "2_5",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Mouse",
        "description": "Dignissimos eius velit aut. Qui et fugiat ipsum magni. Omnis eos voluptatem est et. Quas dolores iure. Temporibus odit voluptates architecto aut veniam sed ab necessitatibus. Adipisci et delectus et.",
        "since": "2023-03-13T01:04:48.550Z",
        "till": "2023-03-13T02:24:48.550Z",
        "id": "2_6",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Pizza",
        "description": "Qui eos repellat consequatur beatae. Enim dolorem placeat commodi quod ea beatae nulla. Qui laborum dolor pariatur commodi illo velit.",
        "since": "2023-03-13T02:24:48.550Z",
        "till": "2023-03-13T03:02:48.550Z",
        "id": "2_7",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Mouse",
        "description": "Rerum voluptatum illum mollitia. Porro nemo eveniet officia debitis exercitationem magnam. Omnis consequatur ratione ex quas soluta blanditiis sed.",
        "since": "2023-03-13T03:02:48.550Z",
        "till": "2023-03-13T04:39:48.550Z",
        "id": "2_8",
        "image": "some image"
      },
      {
        "channelUuid": "2",
        "title": "Mouse",
        "description": "Maiores non voluptatum nemo impedit quibusdam atque accusamus est asperiores. Ullam dolores mollitia vitae rerum dignissimos ut aut minima. Earum tempora soluta. Possimus autem est. Maxime sed quisquam totam consectetur. Ab odit voluptas illo molestiae odit quis voluptas.",
        "since": "2023-03-13T04:39:48.550Z",
        "till": "2023-03-13T05:18:48.551Z",
        "id": "2_9",
        "image": "some image"
      }
    ]
  }
]