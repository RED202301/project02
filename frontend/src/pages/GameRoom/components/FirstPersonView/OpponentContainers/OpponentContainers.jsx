import OpponentContainer from './OpponentContainer/OpponentContainer';
import styles from './OpponentContainers.module.scss';
/** @typedef {import('../../../typedef')} */

export default function OpponentContainers(
  /** @type {{playerMap:playerMap, userId:Number, subscriberMap:subscriberMap, currentPlayer:number, selectedPlayer:number, currentPhase:phase, setSelectedPlayer:setState<Player>}} */ {
    playerMap,
    subscriberMap, // 비디오 화면
    currentPlayer, // 차례 플레이어 테두리
    selectedPlayer, // 선택된 플레이어 테두리
    currentPhase, // 현재 차례에 따라서 조작 가능 여부
    setSelectedPlayer,
    testPlayerWapper,
    players,
  }
) {
  /** @type {{opponent:Player, subscriber:Subscriber}[]}*/
  const opponents = players.map(({ userId }) => ({
    opponent: playerMap[userId],
    subscriber: subscriberMap[userId],
  }));
  // const opponents = Object.keys(subscriberMap).map(id => ({
  //   opponent: playerMap[id],
  //   subscriber: subscriberMap[id],
  // }));

  function angle(idx) {
    const N = opponents.length;
    const range = 360;
    const unitAngle = range / N;
    const startAngle = -90;
    return startAngle + idx * unitAngle;
    // const N = opponents.length;
    // const centerIdx = N - 1;
    // const offset = idx - centerIdx;
    // const range = 180;
    // const unitAngle = range / N;
    // const startAngle = 180 - unitAngle / 2;
    // return startAngle + offset * unitAngle;
  }

  return (
    <div className={`${styles.OpponentContainers}`}>
      {opponents.map(({ opponent, subscriber }, idx) =>
        subscriber ? (
          <OpponentContainer
            {...{
              opponent,
              subscriber,
              angle: angle(idx),
              currentPlayer,
              selectedPlayer,
              setSelectedPlayer,
              currentPhase,
              testPlayerWapper,
            }}
            key={idx}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
}
