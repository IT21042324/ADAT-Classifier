import "./Badge.css";

export const Badge = ({ icon, badgeName, active, color }) => {
  return (
    <div className={active ? "badge active" : "badge"}>
      <div className={"badge-icon " + color}>
        <span class="material-icons icon-size">{icon}</span>
      </div>
      <div className={"badge-name " + color}>{badgeName}</div>
    </div>
  );
};

export const BadgeCard = ({ activeBadge }) => {
  const badges = [
    {
      id: 1,
      badgeName: "Low Risk",
      icon: "gpp_maybe",
      color: "green",
      active: activeBadge.green,
    },
    {
      id: 2,
      badgeName: "Medium Risk",
      icon: "report_problem",
      color: "yellow",
      active: activeBadge.yellow,
    },
    {
      id: 3,
      badgeName: "Severe",
      icon: "report",
      color: "red",
      active: activeBadge.orange,
    },
    {
      id: 3,
      badgeName: "Extremely Severe",
      icon: "emergency",
      color: "red",
      active: activeBadge.red,
    },
  ];

  return (
    <div className="badge-card">
      <div className="badge-card-body">
        {badges.map((badge, index) => (
          <Badge
            icon={badge.icon}
            badgeName={badge.badgeName}
            color={badge.color}
            active={badge.active}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
